import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TeamsService from './teams.service';
import TeamsController from './teams.controller';
import TeamEntity from './schemas/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export default class TeamsModule {}
