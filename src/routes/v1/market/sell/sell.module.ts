import { Module } from '@nestjs/common';
import SellService from './sell.service';
import SellController from './sell.controller';
import ConsumerService from './consumer.service';
import ProducerService from './producer.service';

@Module({
  imports: [
    // SellController,
    // SellService,
    ProducerService,
    ConsumerService,
  ],
  controllers: [
    SellController,
  ],
  providers: [
    // SellController,
    SellService,
    ProducerService,
    ConsumerService,
  ],
  exports: [
    SellService,
  ],
})
export default class SellModule {}
