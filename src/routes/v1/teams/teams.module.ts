import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import PlayersModule from '@v1/players/players.module';
import TeamsService from './teams.service';
import TeamsController from './teams.controller';
import TeamEntity from './schemas/team.entity';
import TeamsRepository from './teams.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity]),
    PlayersModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
  exports: [TeamsService, TeamsRepository],
})
export default class TeamsModule {}
