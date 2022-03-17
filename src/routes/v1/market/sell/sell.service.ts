import { Injectable, OnModuleInit } from '@nestjs/common';
import SetPlayerForSaleRequest from './dto/player-for-sale-request.dto';
import ProducerService from '../services/producer.service';
import ConsumerService from '../services/consumer.service';
import MarketRepository from '../market.repository';

@Injectable()
export default class SellService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly marketRepository: MarketRepository,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'sell' },
      {
        eachMessage: async ({ message }) => {
          // TODO: Deserialize Data
          // const obj = (eval(`new ${typeSent}`))();
          const price = message?.value;
          const playerId = message?.key;
          console.log(`price: ${price}`);
          console.log(`playerId: ${playerId}`);
          // TODO: Add TransferEntity into Transfers table
          this.marketRepository.create({
            playerId: 333,
            price: 1000000,
          });
        },
      },
    );
  }

  // async sellPlayer(playerSellDto: SetPlayerForSaleRequest) {
  //   await this.producerService.produce({
  //     topic: 'sell',
  //     messages: [
  //       {
  //         value: 'Hello World',
  //       },
  //     ],
  //   });
  //   return `Hello World!\n ${playerSellDto}`;
  // }

  async sellPlayer(playerSellDto: SetPlayerForSaleRequest) {
    await this.producerService.produce({
      topic: 'sell',
      messages: [
        {
          key: playerSellDto.playerId.toString(),
          value: playerSellDto.price.toString(),
        },
      ],
    });
    return `Hello World!\n ${playerSellDto}`;
  }
}
