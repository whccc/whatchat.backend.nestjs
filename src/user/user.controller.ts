import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async createUser(@Body() UserDto: UserCreateDto) {
    return this.userService.createUser(UserDto);
  }
}
