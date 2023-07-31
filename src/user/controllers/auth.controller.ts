import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: UserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() LoginUserDto: UserDto) {
    return this.authService.login(LoginUserDto);
  }
}
