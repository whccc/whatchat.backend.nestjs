import { EntityRepository, Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { IUserRepository } from './interfaces/UserRepository.interface';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  public async getUsersByName(userName: string): Promise<any> {
    return User.find({
      userName: Like(`%${userName}%`),
    });
  }
}
