import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonRepository } from './person.repository';
import { PersonService } from './person.service';

@Module({
  providers: [PersonService],
  imports: [TypeOrmModule.forFeature([PersonRepository])],
  controllers: [PersonController],
})
export class PersonModule {}
