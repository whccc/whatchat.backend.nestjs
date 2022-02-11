import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserCreateDto } from './dto/UserCreate.dto';
import { IUserService } from './interfaces/UserService.interface';
import { UserRepository } from './user.repository';
import * as fs from 'fs';
import { HelpersFunctions } from 'src/helper/helper.functions';
import { domainCode, messageApi } from 'src/helper/domaincode';
import { ApiResponse } from 'src/responses/api.response';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly HelpersFunctions: HelpersFunctions,
  ) {}

  public async createUser(UserDto: UserCreateDto): Promise<ApiResponse<User>> {
    const user = await this.UserRepository.searchEmailDuplicate(UserDto.email);

    if (user) {
      throw new HttpException({ status: 400, error: 'error' }, 400);
    }
    //Creando imagen base64 a imagen
    await this.HelpersFunctions.converBase64ToFile(
      UserDto.password,
      `${UserDto.email}.jpg`,
    );
    UserDto.password = `${UserDto.email}.jpg`;
    const dataDb = await this.UserRepository.createUser(UserDto);

    return new ApiResponse(dataDb, domainCode.SUCCESS, messageApi.SUCCESS);
  }
}
