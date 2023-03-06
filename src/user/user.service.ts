import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/UserService.interface';
import { UserRepository } from './user.repository';
import { domainCode, messageApi } from 'src/constants/domaincode';
import { ApiResponse } from 'src/responses/api.response';
import { UserUpdateDto } from './dto/UserUpdate.dt';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly UserRepository: UserRepository) {}

  //Obteniendo usuario por nombre
  public async getUsersByName(userName: string): Promise<ApiResponse<any>> {
    const user = await this.UserRepository.getUsersByName(userName);
    return new ApiResponse(user, domainCode.SUCCESS, messageApi.SUCCESS);
  }

  public async updateDataSetting(
    data: UserUpdateDto,
  ): Promise<ApiResponse<User>> {
    data.file = `${process.env.URL_API_PICTURES}/${data.idUnique}.png`;
    const dataR = await this.UserRepository.updateUserById(data);
    return new ApiResponse(dataR, domainCode.SUCCESS, messageApi.SUCCESS);
  }
}
