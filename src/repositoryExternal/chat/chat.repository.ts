import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiResponse } from 'src/responses/api.response';
import { IChat } from './interfaces/IChat.interface';
import { IChatRepository } from './interfaces/IChatRepository.interface';
import * as https from 'https';

@Injectable()
export class ChatRepository implements IChatRepository {
  public async getChatsByUser(idUser: string): Promise<ApiResponse<IChat>> {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const { data } = await axios.get<ApiResponse<IChat>>(
      `https://192.168.20.5:4000/api/chat/${idUser}`,
      {
        httpAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      },
    );

    return data;
  }
}
