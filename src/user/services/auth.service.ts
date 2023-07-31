import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async createToken(user: User) {
    const accessToken = this.jwtService.sign({ email: user.email }, { expiresIn: process.env.EXPIRESIN });
    return {
      expireIn: process.env.EXPIRESIN,
      accessToken
    }
  }

  async register(newUser: UserDto) {
    const user = await this.usersService.create(newUser);
    const token = await this.createToken(user);
    return {
      email: user.email,
      ...token
    }
  }

  async login(LoginUserDto: UserDto) {
    const user = await this.usersService.findByLogin(LoginUserDto);
    const token = await this.createToken(user);
    return { user, ...token };
  }

  async validateUser(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
