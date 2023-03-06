import { User } from 'src/entity/user.entity';
import { UserUpdateDto } from '../dto/UserUpdate.dt';

export interface IUserRepository {
  getUsersByName(userName: string): Promise<any>;
  getUsersByIdUnique(usersIdUnique: Array<string>): Promise<any>;
  updateUserById(data: UserUpdateDto): Promise<User>;
}
