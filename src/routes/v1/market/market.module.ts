import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import MarketService from './market.service';
import MarketController from './market.controller';
import SellModule from './sell/sell.module';

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
    SellModule,
  ],
  // controllers: [MarketController],
  providers: [MarketService],
})
export default class MarketModule {}
