import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [],
  imports: [ConfigModule, TypeOrmModule.forRoot(), UserModule, PersonModule],
})
export class AppModule {
  public static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
