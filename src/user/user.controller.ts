import {
  Controller,
  Get,
  NotAcceptableException,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserUpdateDto } from './dto/UserUpdate.dt';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('user-by-name/:userName')
  public async getUsersByName(@Param() params: { userName: string }) {
    const userName = params.userName.trim();
    if (userName === '') {
      return new NotAcceptableException();
    }
    return this.userService.getUsersByName(userName);
  }

  @Post('update-data-setting')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './pictures',
        filename: (req, _file, cb) => {
          if (Boolean(req.body.changePhoto)) {
            cb(null, `${req.body.idUnique}.png`);
          }
        },
      }),
    }),
  )
  public async updateDataSetting(@Body() data: UserUpdateDto) {
    return this.userService.updateDataSetting(data);
  }
}
