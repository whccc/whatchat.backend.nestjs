import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/AuthLogin.dto';
import { AuthRegisterDto } from './dto/AuthRegister.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() AuthRegisterDto: AuthRegisterDto) {
    return this.authService.register(AuthRegisterDto);
  }

  @Post('login')
  public async getUserByEmail(@Body() AuthLoginDto: AuthLoginDto) {
    return this.authService.login(AuthLoginDto);
  }
}
