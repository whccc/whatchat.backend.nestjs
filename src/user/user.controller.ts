import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUser() {
    return {
      message: this.userService.holaService(),
    };
  }
}
