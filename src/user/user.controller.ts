import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  Param,
  Post,
} from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() UserDto: UserCreateDto) {
    return this.userService.createUser(UserDto);
  }

  @Get('by-email/:email')
  public async getUserByEmail(@Param() params) {
    if (params.email.trim() === '') {
      return new NotAcceptableException();
    }
    console.log('prueba');
    return this.userService.getUserByEmail(params.email.trim());
    console.log('prueba');
  }

  @Get('user-by-name/:userName')
  public async getUsersByName(@Param() params: { userName: string }) {
    const userName = params.userName.trim();
    if (userName === '') {
      return new NotAcceptableException();
    }
    return this.userService.getUsersByName(userName);
  }
}
