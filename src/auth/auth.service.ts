import { IAuthService } from './interfaces/AuthService.interface';
import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/AuthRegister.dto';
import { AuthRepository } from './auth.repository';
import { ApiResponse } from 'src/responses/api.response';
import { domainCode, messageApi } from 'src/constants/domaincode';
import { User } from 'src/entity/user.entity';
import { AuthLoginDto } from './dto/AuthLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async register(
    authRegisterDto: AuthRegisterDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.authRepository.searchEmailDuplicate(
      authRegisterDto.email,
    );

    if (user) {
      return new ApiResponse(
        null,
        domainCode.BUSINESS,
        messageApi.EMAIL_USER_EXIST,
      );
    }

    const dataDb = await this.authRepository.register(authRegisterDto);

    return new ApiResponse(
      dataDb,
      domainCode.SUCCESS,
      messageApi.successRegister.replace('DATA_USER', authRegisterDto.userName),
    );
  }

  //Obteniendo usuario por email
  public async login(authLoginDto: AuthLoginDto): Promise<ApiResponse<User>> {
    const user = await this.authRepository.login(authLoginDto);
    const dataChat =
      null; /*(await this.ChatRepository.getChatsByUser(user.idUnique))
      .data;*/

    if (user) {
      const token = this.jwtService.sign({ id: user.id });
      return new ApiResponse(
        {
          ...user,
          dataChat,
          token,
        } as any,
        domainCode.SUCCESS,
        messageApi.SUCCESS,
      );
    }

    return new ApiResponse(null, domainCode.BUSINESS, messageApi.userNotFound);
  }
}
