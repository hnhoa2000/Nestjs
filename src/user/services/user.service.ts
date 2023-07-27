import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user.repository";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService
  ) { }

  async create(userDto: UserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10); //hash password
    //check exist user
    const userInDb = await this.userRepository.findByCondition({
      email: userDto.email
    });
    if (userInDb)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    await this.mailerService.sendMail({
      to: userDto.email,
      subject: 'Welcome to my website',
      template: './welcome',
      context: {
        name: userDto.email,
      },
    });
    return this.userRepository.create(userDto);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByCondition({
      email: email,
    });
  }

  async findByLogin(userLogin: UserDto) {
    const user = await this.findByEmail(userLogin.email);
    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    const is_equal = bcrypt.compare(userLogin.password, user.password);
    if (!is_equal)
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    return user;
  }
}