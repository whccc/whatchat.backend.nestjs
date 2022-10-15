import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserCreateDto } from './dto/UserCreate.dto';
import { IUserService } from './interfaces/UserService.interface';
import { UserRepository } from './user.repository';
import * as fs from 'fs';
import { HelpersFunctions } from 'src/helper/helper.functions';
import { domainCode, messageApi } from 'src/constants/domaincode';
import { ApiResponse } from 'src/responses/api.response';
import { chatRepository } from 'src/repositoryExternal/chat/chat.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly ChatRepository: chatRepository,
  ) {}

  public async createUser(UserDto: UserCreateDto): Promise<ApiResponse<User>> {
    const user = await this.UserRepository.searchEmailDuplicate(UserDto.email);

    if (user) {
      return new ApiResponse(
        null,
        domainCode.BUSINESS,
        messageApi.EMAIL_USER_EXIST,
      );
    }

    const dataDb = await this.UserRepository.createUser(UserDto);

    return new ApiResponse(
      dataDb,
      domainCode.SUCCESS,
      messageApi.successRegister.replace('DATA_USER', UserDto.userName),
    );
  }

  //Obteniendo usuario por email
  public async getUserByEmail(email: string): Promise<ApiResponse<User>> {
    const user = await this.UserRepository.getUserByEmail(email);
    const dataChat =
      null; /*(await this.ChatRepository.getChatsByUser(user.idUnique))
      .data;*/

    if (user) {
      return new ApiResponse(
        {
          ...user,
          dataChat,
        } as any,
        domainCode.SUCCESS,
        messageApi.SUCCESS,
      );
    }

    return new ApiResponse(null, domainCode.BUSINESS, messageApi.userNotFound);
  }

  //Obteniendo usuario por nombre
  public async getUsersByName(userName: string): Promise<ApiResponse<any>> {
    const user = await this.UserRepository.getUsersByName(userName);
    return new ApiResponse(user, domainCode.SUCCESS, messageApi.SUCCESS);
  }
}
