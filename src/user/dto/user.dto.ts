import { IsNotEmpty, IsEmail} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty() password: string;
}

export class JwtPayload {
  @IsNotEmpty() email: string
}