import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm/index';
// import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
// import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
// import PaginationUtils from '@utils/pagination.utils';
import CreatePlayerDto from './dto/create-player.dto';
import UpdatePlayerDto from './dto/update-player.dto';
import PlayerEntity from './entities/player.entity';

@Injectable()
export default class PlayersRepository {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playersModel: Repository<PlayerEntity>,
  ) {}

  public create(player: CreatePlayerDto): Promise<PlayerEntity> {
    return this.playersModel.save(player);
  }

  public async getByName(first: string): Promise<PlayerEntity | undefined> {
    return this.playersModel.findOne({
      where: [{
        first,
      }],
    });
  }

  public async getById(id: number): Promise<PlayerEntity | undefined> {
    return this.playersModel.findOne(id);
  }

  public async getByTeamId(id: number): Promise<PlayerEntity[] | undefined> {
    return this.playersModel.find({
      where: [{ team: id }],
    });
  }

  public updateById(id: number, data: UpdatePlayerDto): Promise<UpdateResult> {
    return this.playersModel.update(id, data);
  }

  // public async getAllWithPagination(options: PaginationParamsInterface): Promise<PaginatedUsersInterface> {
  //   const verified = true;
  //   const [users, totalCount] = await Promise.all([
  //     this.usersModel.find({
  //       where: {
  //         verified,
  //       },
  //       skip: PaginationUtils.getSkipCount(options.page, options.limit),
  //       take: PaginationUtils.getLimitCount(options.limit),
  //     }),
  //     this.usersModel.count({
  //       where: { verified },
  //     }),
  //   ]);

  //   return { paginatedResult: users, totalCount };
  // }
}
