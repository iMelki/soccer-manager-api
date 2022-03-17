import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { Injectable } from '@nestjs/common';
import TransferEntity from './entities/transfer.entity';
import MarketRepository from './market.repository';
import SetPlayerForSale from './sell/dto/player-for-sale.dto';

@Injectable()
export default class MarketService {
  constructor(
    private readonly marketRepository: MarketRepository,
  ) {}

  create(playerForSaleDto: SetPlayerForSale) {
    return `This action adds a new Player to the Transfer List: ${playerForSaleDto}`;
  }

  public async findAll() { // : Promise<TeamEntity[]> {
    return 'This action returns all players on the Transfer List';
  }

  public async getAllDetailedWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedEntitiesInterface<TransferEntity>> {
    return this.marketRepository.getAllDetailedWithPagination(options);
  }

  public async findOne(id: number): Promise<TransferEntity | undefined> {
    return this.marketRepository.getById(id);
  }

  public async findOneIncludingDetails(id: number): Promise<TransferEntity | undefined> {
    return this.marketRepository.getById(id, {
      relations: ['player'],
    });
  }

  update(id: number, playerForSaleDto: SetPlayerForSale) {
    return `This action updates a #${id} market: ${playerForSaleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} market`;
  }
}
