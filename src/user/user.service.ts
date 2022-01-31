import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor() {}

  public holaService() {
    return 'Hola service';
  }
}
