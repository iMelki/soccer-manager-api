import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes, RouterModule } from 'nest-router';
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
    // SellModule,
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
  ],
  exports: [MarketService, MarketRepository],
})
export default class MarketModule {}
