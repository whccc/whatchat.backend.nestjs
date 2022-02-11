import { User } from 'src/entity/user.entity';
import { ApiResponse } from 'src/responses/api.response';
import { UserCreateDto } from '../dto/UserCreate.dto';

export interface IUserService {
  createUser(UserDto: UserCreateDto): Promise<ApiResponse<User>>;
}
