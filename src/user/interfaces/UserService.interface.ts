import { ApiResponse } from 'src/responses/api.response';

export interface IUserService {
  getUsersByName(userName: string): Promise<ApiResponse<any>>;
}
