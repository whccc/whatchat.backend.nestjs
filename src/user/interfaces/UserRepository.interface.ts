import { User } from 'src/entity/user.entity';
import { UserCreateDto } from '../dto/UserCreate.dto';

export interface IUserRepository {
  createUser(UserDTO: UserCreateDto): Promise<User>;
}
