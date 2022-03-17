import { Injectable, OnModuleInit } from '@nestjs/common';
import SetPlayerForSaleRequest from './dto/player-for-sale-request.dto';
import UpdateSellDto from './dto/update-sell.dto';
import ProducerService from './producer.service';
import ConsumerService from './consumer.service';

@Injectable()
export default class SellService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'sell' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message?.value?.toString() || 0,
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }

  async sellPlayer(playerSellDto: SetPlayerForSaleRequest) {
    await this.producerService.produce({
      topic: 'sell',
      messages: [
        {
          value: 'Hello World',
        },
      ],
    });
    return `Hello World!\n ${playerSellDto}`;
  }

  findAll() {
    return 'This action returns all sell';
  }

  findOne(id: number) {
    return `This action returns a #${id} sell`;
  }

  update(id: number, updateSellDto: UpdateSellDto) {
    return `This action updates a #${updateSellDto} sell`;
  }

  remove(id: number) {
    return `This action removes a #${id} sell`;
  }
}
