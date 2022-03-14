import { PartialType } from '@nestjs/swagger';
import CreatePlayerDto from './create-player.dto';

export default class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
