import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import authConstants from '@v1/auth/auth-constants';

import TeamsModule from '@v1/teams/teams.module';
import PlayersModule from '@v1/players/players.module';

import UsersController from './users.controller';
import UsersService from './users.service';
import UserEntity from './schemas/user.entity';
import UsersRepository from './users.repository';

@Module({
  imports: [
    TeamsModule,
    PlayersModule,
    TypeOrmModule.forFeature([UserEntity]),
    /***/
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
