import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from './dto/UserCreate.dto';
import { IUserRepository } from './interfaces/UserRepository.interface';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  public async createUser(UserDTO: UserCreateDto): Promise<User> {
    return User.create(UserDTO);
  }
}
