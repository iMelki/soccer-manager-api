import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import PaginationUtils from '@utils/pagination.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm/index';
import TransferEntity from './entities/transfer.entity';
import SetPlayerForSale from './sell/dto/player-for-sale.dto';

@Injectable()
export default class MarketRepository {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly transferModel: Repository<TransferEntity>,
  ) {}

  public create(player: SetPlayerForSale): Promise<TransferEntity> {
    return this.transferModel.save(player);
  }

  public async getByPlayerId(playerId: number): Promise<TransferEntity | undefined> {
    return this.transferModel.findOne({
      where: [
        {
          playerId,
        },
      ],
    });
  }

  public async getById(
    id: number,
    options?: FindOneOptions<TransferEntity>,
  ): Promise<TransferEntity | undefined> {
    return this.transferModel.findOne(id, options);
  }

  public async getByIdIncludingPlayer(
    id: number,
  ): Promise<TransferEntity | undefined> {
    return this.transferModel.findOne(id, {
      relations: ['player'],
    });
  }

  public async getAllDetailedWithPagination(options: PaginationParamsInterface): Promise<PaginatedEntitiesInterface<TransferEntity>> {
    const [transfers, totalCount] = await Promise.all([
      this.transferModel.find({
        relations: ['player'],
        skip: PaginationUtils.getSkipCount(options.page, options.limit),
        take: PaginationUtils.getLimitCount(options.limit),
      }),
      this.transferModel.count(),
    ]);

    return { paginatedResult: transfers, totalCount };
  }
}
