import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';

@Module({
  providers: [],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        return {
          type: 'postgres' as 'postgres',
          host: config.get(Configuration.HOST),
          username: config.get(Configuration.USERNAME),
          port: 52409,
          database: config.get(Configuration.DATABASE),
          password: config.get(Configuration.PASSWORD),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
        } as ConnectionOptions;
      },
    }),

    UserModule,
  ],
})
export class AppModule {
  public static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    console.log(this._configService.get(Configuration.DATABASE));
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
