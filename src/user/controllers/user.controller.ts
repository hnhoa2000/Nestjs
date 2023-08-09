import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard())
  @Get('/profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Put()
  async updateProfile(@Req() req: any, @Body() updateUser: UpdateUserDto) {
    return this.userService.updateProfile(req.user._id, updateUser);
  }
}
