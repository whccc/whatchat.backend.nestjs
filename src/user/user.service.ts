import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserCreateDto } from './dto/UserCreate.dto';
import { IUserService } from './interfaces/UserService.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly UserRepository: UserRepository) {}

  public createUser(UserDto: UserCreateDto): Promise<User> {
    return this.UserRepository.createUser(UserDto);
  }
}
