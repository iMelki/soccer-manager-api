import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import PaginationUtils from '@utils/pagination.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm/index';
import TransferEntity from './entities/transfer.entity';
import SetPlayerForSaleRequest from './sell/dto/player-for-sale-request.dto';

@Injectable()
export default class MarketRepository {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly transferModel: Repository<TransferEntity>,
  ) {}

  public create(player: SetPlayerForSaleRequest): Promise<TransferEntity> {
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

  public updateById(id: number, data: SetPlayerForSaleRequest): Promise<UpdateResult> {
    return this.transferModel.update(id, data);
  }

  public async getAllWithPagination(options: PaginationParamsInterface): Promise<PaginatedEntitiesInterface<TransferEntity>> {
    const [transfers, totalCount] = await Promise.all([
      this.transferModel.find({
        skip: PaginationUtils.getSkipCount(options.page, options.limit),
        take: PaginationUtils.getLimitCount(options.limit),
      }),
      this.transferModel.count(),
    ]);

    return { paginatedResult: transfers, totalCount };
  }
}
