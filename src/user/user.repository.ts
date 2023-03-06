import { EntityRepository, Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserUpdateDto } from './dto/UserUpdate.dt';
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

  public async getUsersByIdUnique(usersIdUnique: Array<string>): Promise<any> {
    return User.createQueryBuilder('tbluser')
      .where('tbluser.idunique IN (:...usersIdUnique)', {
        usersIdUnique,
      })
      .getMany();
  }

  public async updateUserById(data: UserUpdateDto): Promise<User> {
    const { id, comment, name, file, phone } = data;
    const user = await User.findOneOrFail({
      where: {
        id,
      },
    });
    user.comment = comment;
    user.userName = name;
    user.picture = file;
    user.phone = phone;

    await user.save();

    return user;
  }
}
