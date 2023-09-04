import { IsNotEmpty, IsEmail, IsOptional, IsPhoneNumber, IsEnum } from 'class-validator';
import { Gender } from '../../../src/common/enum';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty() password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty() 
  lastName: string

  @IsOptional()
  @IsPhoneNumber()
  phone: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string
}

export class JwtPayload {
  @IsNotEmpty() email: string
}