import { Injectable } from '@nestjs/common';
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
    return `This action returns all players`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
