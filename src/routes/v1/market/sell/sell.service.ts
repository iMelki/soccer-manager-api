import { Injectable, OnModuleInit } from '@nestjs/common';
import SetPlayerForSaleRequest from './dto/player-for-sale-request.dto';
import ProducerService from '../services/producer.service';
import ConsumerService from '../services/consumer.service';
import MarketRepository from '../market.repository';
import PlayersService from '@v1/players/players.service';

@Injectable()
export default class SellService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly playerService: PlayersService,
    private readonly marketRepository: MarketRepository,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'sell' },
      {
        eachMessage: async ({ message }) => {
          // Deserialize Data:
          const price = message?.value;
          const playerId = message?.key;
          const player = await this.playerService.findOne(Number(playerId));
          // Add TransferEntity into Transfers table:
          this.marketRepository.create({
            player: player,
            price: Number(price?.toString()),
          });
        },
      },
    );
  }

  async sellPlayer(playerSellRequest: SetPlayerForSaleRequest) {
    await this.producerService.produce({
      topic: 'sell',
      messages: [
        {
          key: playerSellRequest.playerId?.toString(),
          value: playerSellRequest?.price?.toString() || '0',
        },
      ],
    });
    return `Hello World!\n ${playerSellRequest}`;
  }
}
