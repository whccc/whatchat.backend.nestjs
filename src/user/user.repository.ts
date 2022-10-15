import {
  createQueryBuilder,
  EntityRepository,
  getManager,
  getRepository,
  Like,
  Repository,
} from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from './dto/UserCreate.dto';
import { IUserRepository } from './interfaces/UserRepository.interface';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  public async createUser(UserDTO: UserCreateDto): Promise<User> {
    const UserEntity = User.create({ ...UserDTO });
    await UserEntity.save();
    return UserEntity;
  }

  public async searchEmailDuplicate(email: string): Promise<User> {
    return User.findOne({ where: { email } });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return User.findOne({ where: { email } });
  }

  public async getUsersByName(userName: string): Promise<any> {
    return User.find({
      userName: Like(`%${userName}%`),
    });
  }
}
