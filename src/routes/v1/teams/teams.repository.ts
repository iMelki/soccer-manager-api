import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import PaginationUtils from '@utils/pagination.utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm/index';
import CreateTeamDto from './dto/create-team.dto';
import UpdateTeamDto from './dto/update-team.dto';
import TeamEntity from './schemas/team.entity';

@Injectable()
export default class TeamsRepository {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamsModel: Repository<TeamEntity>,
  ) {}

  public create(team: CreateTeamDto): Promise<TeamEntity> {
    return this.teamsModel.save(team);
  }

  public async getByName(name: string): Promise<TeamEntity | undefined> {
    return this.teamsModel.findOne({
      where: [
        {
          name,
        },
      ],
    });
  }

  public async getById(
    id: number,
    options?: FindOneOptions<TeamEntity>,
  ): Promise<TeamEntity | undefined> {
    return this.teamsModel.findOne(id, options);
  }

  public async getByIdIncludingPlayers(
    id: number,
  ): Promise<TeamEntity | undefined> {
    return this.teamsModel.findOne(id, {
      relations: ['players'],
    });
  }

  public async getByUserId(id: number): Promise<TeamEntity | undefined> {
    return this.teamsModel.findOne({
      where: [{ userId: id }],
    });
  }

  public updateById(id: number, data: UpdateTeamDto): Promise<UpdateResult> {
    return this.teamsModel.update(id, data);
  }

  public async getAllWithPagination(options: PaginationParamsInterface): Promise<PaginatedEntitiesInterface<TeamEntity>> {
    const [teams, totalCount] = await Promise.all([
      this.teamsModel.find({
        skip: PaginationUtils.getSkipCount(options.page, options.limit),
        take: PaginationUtils.getLimitCount(options.limit),
      }),
      this.teamsModel.count(),
    ]);

    return { paginatedResult: teams, totalCount };
  }
}
