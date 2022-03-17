import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes, RouterModule } from 'nest-router';
import PlayersService from '@v1/players/players.service';
import PlayersModule from '@v1/players/players.module';
import TeamsModule from '@v1/teams/teams.module';
import AuthModule from '@v1/auth/auth.module';
import UsersModule from '@v1/users/users.module';
import MarketService from './market.service';
import MarketController from './market.controller';
import ConsumerService from './services/consumer.service';
import ProducerService from './services/producer.service';
import TransferEntity from './entities/transfer.entity';
import MarketRepository from './market.repository';
import SellController from './sell/sell.controller';
import SellService from './sell/sell.service';
import BuyController from './buy/buy.controller';
import BuyService from './buy/buy.service';

const routes: Routes = [
  {
    path: '/api/v1/market',
    children: [
      // { path: '/sell', module: SellModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forFeature([TransferEntity]),
    PlayersModule,
    TeamsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [
    MarketController,
    SellController,
    BuyController,
  ],
  providers: [
    MarketService,
    MarketRepository,
    ConsumerService,
    ProducerService,
    SellService,
    BuyService,
    PlayersService,
  ],
  exports: [
    MarketService,
    MarketRepository,
  ],
})
export default class MarketModule {}
