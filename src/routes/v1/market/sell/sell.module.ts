// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import SellService from './sell.service';
// import SellController from './sell.controller';
// import ConsumerService from './consumer.service';
// import ProducerService from './producer.service';
// import MarketRepository from '../market.repository';
// import TransferEntity from '../entities/transfer.entity';

// @Module({
//   imports: [
//     // SellController,
//     // SellService,
//     TypeOrmModule.forFeature([TransferEntity]),
//     ProducerService,
//     ConsumerService,
//     MarketRepository,
//   ],
//   controllers: [
//     SellController,
//   ],
//   providers: [
//     // SellController,
//     SellService,
//     ProducerService,
//     ConsumerService,
//     MarketRepository,
//   ],
//   exports: [
//     SellService,
//   ],
// })
// export default class SellModule {}
