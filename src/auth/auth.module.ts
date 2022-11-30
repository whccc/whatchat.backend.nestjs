import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.keys';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { HelpersFunctions } from 'src/helper/helper.functions';
import { ChatRepository } from 'src/repositoryExternal/chat/chat.repository';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    ConfigModule,
    JwtModule.register({
      secret: '12345',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    HelpersFunctions,
    JwtStrategy,
    ChatRepository,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {
  public static secretJwt: string;

  constructor(private readonly _configService: ConfigService) {
    AuthModule.secretJwt = this._configService.get(Configuration.SECRET_JWT);
  }
}
