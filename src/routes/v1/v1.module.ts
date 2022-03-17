import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import MarketModule from './market/market.module';
import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import TeamsModule from './teams/teams.module';
import PlayersModule from './players/players.module';

const routes: Routes = [
  {
    path: '/api/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/teams', module: TeamsModule },
      { path: '/players', module: PlayersModule },
      { path: '/market', module: MarketModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    TeamsModule,
    PlayersModule,
    MarketModule,
  ],
})
export default class V1Module {}
