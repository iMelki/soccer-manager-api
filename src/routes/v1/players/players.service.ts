import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import CreatePlayerDto from './dto/create-player.dto';
import UpdatePlayerDto from './dto/update-player.dto';
import PlayerEntity from './entities/player.entity';
import PlayersRepository from './players.repository';

@Injectable()
export default class PlayersService {
  constructor(
    private readonly playersRepository: PlayersRepository,
  ) {}

  public async create(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
    return this.playersRepository.create(createPlayerDto);
  }

  findAll() {
    return 'This action returns all players';
  }

  public async findAllWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedEntitiesInterface<PlayerEntity>> {
    return this.playersRepository.getAllWithPagination(options);
  }

  public async findOne(id: number): Promise<PlayerEntity | undefined> {
    return this.playersRepository.getById(id);
  }

  update(id: number, data: UpdatePlayerDto): Promise<UpdateResult> {
    return this.playersRepository.updateById(id, data);
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
