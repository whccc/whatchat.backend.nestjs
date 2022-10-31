import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { AuthLoginDto } from './dto/AuthLogin.dto';
import { AuthRegisterDto } from './dto/AuthRegister.dto';
import { IAuthRepository } from './interfaces/AuthRepository.interface';

@EntityRepository(User)
export class AuthRepository
  extends Repository<User>
  implements IAuthRepository
{
  public async register(authRegisterDto: AuthRegisterDto): Promise<User> {
    const UserEntity = User.create({ ...authRegisterDto });
    await UserEntity.save();
    return UserEntity;
  }

  public async login(authLoginDto: AuthLoginDto): Promise<User> {
    return User.findOne({ where: { email: authLoginDto.email } });
  }

  public async searchEmailDuplicate(email: string): Promise<User> {
    return User.findOne({ where: { email } });
  }
}
