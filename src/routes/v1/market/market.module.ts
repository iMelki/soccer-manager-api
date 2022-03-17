import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes, RouterModule } from 'nest-router';
import MarketService from './market.service';
import MarketController from './market.controller';
import SellModule from './sell/sell.module';
import TransferEntity from './entities/transfer.entity';
import MarketRepository from './market.repository';

const routes: Routes = [
  {
    path: '/api/v1/market',
    children: [
      { path: '/sell', module: SellModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forFeature([TransferEntity]),
    SellModule,
  ],
  controllers: [MarketController],
  providers: [MarketService, MarketRepository],
  exports: [MarketService, MarketRepository],
})
export default class MarketModule {}
