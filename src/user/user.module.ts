import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersFunctions } from 'src/helper/helper.functions';
import { chatRepository } from 'src/repositoryExternal/chat/chat.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, HelpersFunctions, chatRepository],
  controllers: [UserController],
})
export class UserModule {}
