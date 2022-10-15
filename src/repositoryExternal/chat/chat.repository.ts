import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiResponse } from 'src/responses/api.response';
import { IChat } from './interfaces/IChat.interface';
import { IChatRepository } from './interfaces/IChatRepository.interface';

@Injectable()
export class chatRepository implements IChatRepository {
  public async getChatsByUser(idUser: string): Promise<ApiResponse<IChat>> {
    const { data } = await axios.get<ApiResponse<IChat>>(
      `http://localhost:4000/api/chat/${idUser}`,
    );

    return data;
  }
}
