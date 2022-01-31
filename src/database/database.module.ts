import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

Module({
  imports: [databaseProviders[0]],
  exports: [databaseProviders[0]],
});

export class DatabaseModule {}
