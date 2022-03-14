import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import TeamEntity from '@v1/teams/schemas/team.entity';

export default class UpdateUserDto extends PartialType(SignUpDto) {
  @ApiPropertyOptional({
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  readonly verified?: boolean = true;

  @ApiPropertyOptional({
    type: TeamEntity,
  })
  @IsOptional()
  readonly team?: TeamEntity | undefined;
}
