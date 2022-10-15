import { User } from 'src/entity/user.entity';
import { UserCreateDto } from '../dto/UserCreate.dto';

export interface IUserRepository {
  createUser(UserDTO: UserCreateDto): Promise<User>;
  searchEmailDuplicate(email: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUsersByName(userName: string): Promise<any>;
}
