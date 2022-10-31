import { User } from 'src/entity/user.entity';
import { AuthLoginDto } from '../dto/AuthLogin.dto';
import { AuthRegisterDto } from '../dto/AuthRegister.dto';

export interface IAuthRepository {
  register(authRegisterDto: AuthRegisterDto): Promise<User>;
  login(authLoginDto: AuthLoginDto): Promise<User>;
  searchEmailDuplicate(email: string): Promise<User>;
}
