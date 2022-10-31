import { User } from 'src/entity/user.entity';
import { ApiResponse } from 'src/responses/api.response';
import { AuthLoginDto } from '../dto/AuthLogin.dto';
import { AuthRegisterDto } from '../dto/AuthRegister.dto';

export interface IAuthService {
  register(authRegisterDto: AuthRegisterDto): Promise<ApiResponse<User>>;
  login(authLoginDto: AuthLoginDto): Promise<ApiResponse<User>>;
}
