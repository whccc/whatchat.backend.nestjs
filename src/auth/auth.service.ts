import { IAuthService } from './interfaces/AuthService.interface';
import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/AuthRegister.dto';
import { AuthRepository } from './auth.repository';
import { ApiResponse } from 'src/responses/api.response';
import { domainCode, messageApi } from 'src/constants/domaincode';
import { User } from 'src/entity/user.entity';
import { AuthLoginDto } from './dto/AuthLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ChatRepository } from 'src/repositoryExternal/chat/chat.repository';
import { TypesChat } from 'src/constants/typesChat';
import {
  IChats,
  IChatsInfoMembers,
} from 'src/repositoryExternal/chat/interfaces/IChat.interface';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
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
    console.log('hola');
    const user = await this.authRepository.login(authLoginDto);
    const dataChat = (await this.chatRepository.getChatsByUser(user.idUnique))
      .data;
    console.log('hola2');
    if (!user) {
      return new ApiResponse(
        null,
        domainCode.BUSINESS,
        messageApi.userNotFound,
      );
    }
    const token = this.jwtService.sign({ id: user.id });
    let dataChats = [];
    if (dataChat) {
      dataChats = await this.infoMemberChatTypeOneToOne(
        dataChat.chats,
        user.idUnique,
      );
    }

    return new ApiResponse(
      {
        ...user,
        dataChats,
        token,
      } as any,
      domainCode.SUCCESS,
      messageApi.SUCCESS,
    );
  }

  //Obteniendo información de los usuarios para chat tipo=1 1 vs 1
  private async infoMemberChatTypeOneToOne(
    arrayChats: Array<IChats>,
    idUserUnique: string,
  ): Promise<Array<IChatsInfoMembers>> {
    const usersIdUnique: Array<string> = [];
    for (const u of arrayChats) {
      for (const us of u.members) {
        if (!usersIdUnique.includes(us)) {
          usersIdUnique.push(us);
        }
      }
    }

    const users = await this.userRepository.getUsersByIdUnique(usersIdUnique);
    const transformUser = this.transformDataToUsers(users, arrayChats);

    return transformUser;
  }

  //Consultando información de los miembros
  public async transformDataToUsers(
    users: Array<any>,
    chats: Array<IChats>,
  ): Promise<Array<IChatsInfoMembers>> {
    const arrayUser: Array<IChatsInfoMembers> = JSON.parse(
      JSON.stringify(chats),
    );
    for (const u of arrayUser) {
      for (const [i, us] of u.members.entries()) {
        const userFind = users.find((uf) => uf.idUnique === us);

        if (userFind) {
          u.members[i] = {
            idUnique: userFind.idUnique,
            userName: userFind.userName,
            picture: userFind.picture,
          };
        }
      }
    }

    return arrayUser;
  }
}
