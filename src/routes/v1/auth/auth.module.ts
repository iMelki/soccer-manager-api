import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import UsersModule from '@v1/users/users.module';
import TeamsModule from '@v1/teams/teams.module';
import PlayersModule from '@v1/players/players.module';

import AuthRepository from './auth.repository';
import LocalStrategy from './strategies/local.strategy';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';

import authConstants from './auth-constants';

import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    UsersModule,
    TeamsModule,
    PlayersModule,
    PassportModule,
    /***/
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AuthRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
