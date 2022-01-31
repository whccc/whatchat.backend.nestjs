import { User } from 'src/entity/user.entity';
import { UserCreateDto } from '../dto/UserCreate.dto';

export interface IUserService {
  createUser(UserDto: UserCreateDto): Promise<User>;
}
