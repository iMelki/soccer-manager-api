import { ApiProperty, PartialType } from '@nestjs/swagger';
// import TransferEntity from '@v1/market/entities/transfer.entity';
import TeamEntity from '@v1/teams/schemas/team.entity';
import CreatePlayerDto from './create-player.dto';

export default class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
    @ApiProperty({ type: TeamEntity })
    readonly team?: TeamEntity | undefined;

  // @ApiProperty({ type: TransferEntity })
  // readonly transfer?: TransferEntity | null = null;
}
