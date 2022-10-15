import { ApiResponse } from 'src/responses/api.response';
import { IChat } from './IChat.interface';

export interface IChatRepository {
  getChatsByUser(idUser: string): Promise<ApiResponse<IChat>>;
}
