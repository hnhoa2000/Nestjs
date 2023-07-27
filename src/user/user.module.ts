import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRETKEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    UserController,
    AuthController
  ],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    JwtStrategy
  ],
})
export class UsersModule { }
