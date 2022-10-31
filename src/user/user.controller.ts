import {
  Controller,
  Get,
  NotAcceptableException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user-by-name/:userName')
  public async getUsersByName(@Param() params: { userName: string }) {
    const userName = params.userName.trim();
    if (userName === '') {
      return new NotAcceptableException();
    }
    return this.userService.getUsersByName(userName);
  }
}
