import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PlayersService from './players.service';
import PlayersController from './players.controller';
import PlayerEntity from './entities/player.entity';
import PlayersRepository from './players.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService, PlayersRepository],
})
export default class PlayersModule {}
