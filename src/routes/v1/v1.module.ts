import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';

import AuthModule from './auth/auth.module';
import TeamsModule from './teams/teams.module';
import UsersModule from './users/users.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/teams', module: TeamsModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    TeamsModule,
  ],
})
export default class V1Module {}
