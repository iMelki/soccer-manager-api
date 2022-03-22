import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { DecodedUser } from '@v1/auth/interfaces/decoded-user.interface';
import authConstants from '@v1/auth/auth-constants';
import TeamsService from '@v1/teams/teams.service';
import AuthService from '@v1/auth/auth.service';
import PlayersService from '@v1/players/players.service';
import UsersService from '@v1/users/users.service';
import ProducerService from '../services/producer.service';
import ConsumerService from '../services/consumer.service';
import MarketService from '../market.service';
import PlayerBuyDto from './dto/player-buy.dto';

@Injectable()
export default class BuyService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly usersService: UsersService,
    private readonly playerService: PlayersService,
    private readonly teamsService: TeamsService,
    private readonly marketService: MarketService,
    private readonly authService: AuthService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topic: 'buy' },
      {
        eachMessage: async ({ message }) => {
          try {
            // Deserialize Data:
            const transferId = Number(message?.value?.toString());
            const buyerToken = message?.key?.toString();

            const decodedUser: DecodedUser | null = await this.authService.verifyToken(
              buyerToken || '',
              authConstants.jwt.secrets.accessToken,
            );

            if (!decodedUser) {
              throw new ForbiddenException('Incorrect token');
              // console.log('Incorrect token');
            }
            const userId = decodedUser.id;
            const userObj = await this.usersService.getVerifiedUserById(userId);
            const team = userObj?.team;
            // const userObj = await this.teamsService.(team);
            const transferObj = await this.marketService.findOneIncludingDetails(Number(transferId));
            if (!team?.budget || (transferObj?.price && transferObj?.price > team?.budget)) {
              throw new ForbiddenException('Inssuficient budget!');
              // console.log('Inssuficient budget!');
            }

            const player = transferObj?.player;
            const sellingTeam = player?.team;
            const val = player?.value || 0;
            const newVal = Math.floor((1.1 + 0.9 * Math.random()) * val);
            await this.playerService.update(player?.id || 0, {
              ...player,
              value: newVal,
              team,
            });

            const origSellerValue = sellingTeam?.value || 0;
            const origSellerBudget = sellingTeam?.budget || 0;
            await this.teamsService.update(sellingTeam?.id || 0, {
              // ...sellingTeam,
              name: sellingTeam?.name,
              country: sellingTeam?.country,
              value: origSellerValue - val,
              budget: origSellerBudget + (transferObj?.price || 0),
              // players: sellingTeam?.players?.filter((p) => p.id !== player?.id),
            });

            this.marketService.remove(transferId);

            const origBuyerValue = team?.value || 0;
            const origBuyerBudget = team?.budget || 0;

            let playersArr = team?.players;
            if (player) {
              if (playersArr) {
                playersArr.push(player);
              } else {
                playersArr = [player];
              }
            }

            this.teamsService.update(team?.id || 0, {
              // ...team,
              name: team?.name,
              country: team?.country,
              value: origBuyerValue + newVal,
              budget: origBuyerBudget - (transferObj?.price || 0),
              // players: playersArr,
            });
          } catch (err: any) {
            console.log(err?.message);
          }
        },
      },
    );
  }

  async buyPlayer(playerBuyDto: PlayerBuyDto) {
    await this.producerService.produce({
      topic: 'buy',
      messages: [
        {
          key: playerBuyDto?.buyerToken?.toString(),
          value: playerBuyDto?.transferId?.toString() || '0',
        },
      ],
    });
    return 'Sent request to buy player!';
  }
}
