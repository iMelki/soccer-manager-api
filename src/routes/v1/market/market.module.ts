import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes, RouterModule } from 'nest-router';
import PlayersService from '@v1/players/players.service';
import PlayersModule from '@v1/players/players.module';
import MarketService from './market.service';
import MarketController from './market.controller';
import ConsumerService from './services/consumer.service';
import ProducerService from './services/producer.service';
import TransferEntity from './entities/transfer.entity';
import MarketRepository from './market.repository';
import SellController from './sell/sell.controller';
import SellService from './sell/sell.service';

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
  ],
  controllers: [
    MarketController,
    SellController,
  ],
  providers: [
    MarketService,
    MarketRepository,
    ConsumerService,
    ProducerService,
    SellService,
    PlayersService,
  ],
  exports: [
    MarketService,
    MarketRepository,
  ],
})
export default class MarketModule {}
