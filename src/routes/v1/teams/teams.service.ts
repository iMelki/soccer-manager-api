import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import CreatePlayerDto from '@v1/players/dto/create-player.dto';
import { Position } from '@v1/players/enums/position.enum';
import PlayersService from '@v1/players/players.service';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import CreateTeamDto from './dto/create-team.dto';
// import UpdateTeamDto from './dto/update-team.dto';
import TeamEntity from './schemas/team.entity';
import TeamsRepository from './teams.repository';

@Injectable()
export default class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly playersService: PlayersService,
    // private readonly jwtService: JwtService,
  ) {}

  public async create(createTeamDto: CreateTeamDto): Promise<TeamEntity> {
    let value = 0;
    // Create 20 new PLAYERS for the TEAM:
    // TODO: Get these constants from CONFIG (add the initDtos below)
    // TODO: Get random data from a 3rd party API
    const playerDtos: CreatePlayerDto[] = [];
    // 3 goalkeepers:
    for (let i = 0; i < 3; i += 1) {
      playerDtos.push(new CreatePlayerDto({
        first: 'Goal',
        last: 'Keeper',
        country: 'GK',
        position: Position.Goalkeeper,
      }));
      value += playerDtos[i].value || 0;
    }
    // 6 defenders:
    for (let i = 0; i < 6; i += 1) {
      playerDtos.push(new CreatePlayerDto({
        first: 'Def',
        last: 'Fender',
        country: 'DF',
        position: Position.Defender,
      }));
      value += playerDtos[i].value || 0;
    }
    // 6 midfielders:
    for (let i = 0; i < 6; i += 1) {
      playerDtos.push(new CreatePlayerDto({
        first: 'Mid',
        last: 'Fielder',
        country: 'MF',
        position: Position.Midfielder,
      }));
      value += playerDtos[i].value || 0;
    }
    // 5 attackers:
    for (let i = 0; i < 5; i += 1) {
      playerDtos.push(new CreatePlayerDto({
        first: 'Att',
        last: 'Acker',
        country: 'AT',
        position: Position.Attacker,
      }));
      value += playerDtos[i].value || 0;
    }

    const players = await Promise.all(playerDtos.map(async (dto) => {
      return this.playersService.create(dto);
    }));

    return this.teamsRepository.create(new CreateTeamDto({
      ...createTeamDto,
      players,
      value,
    }));
  }

  public async findAll() { // : Promise<TeamEntity[]> {
    return 'This action returns all teams';
  }

  public async findAllWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedEntitiesInterface<TeamEntity>> {
    return this.teamsRepository.getAllWithPagination(options);
  }

  public async findOne(id: number): Promise<TeamEntity | undefined> {
    return this.teamsRepository.getById(id);
  }

  public async findOneIncludingPlayers(id: number): Promise<TeamEntity | undefined> {
    return this.teamsRepository.getById(id, {
      relations: ['players'],
    });
  }

  public async findOneIncludingPlayersById(id: number): Promise<TeamEntity | undefined> {
    return this.teamsRepository.getByIdIncludingPlayers(id);
  }

  update(id: number, data: CreateTeamDto): Promise<UpdateResult> {
    return this.teamsRepository.updateById(id, data);
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

  // public async getBudgetBy
}
