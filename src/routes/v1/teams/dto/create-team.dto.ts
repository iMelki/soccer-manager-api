import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PlayerEntity from '@v1/players/entities/player.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateTeamDto {
  constructor(body: CreateTeamDto | null = null) {
    if (body) {
      Object.assign(this, body);
    }
  }

  @ApiProperty({
    type: String,
  })
  @IsString()
  readonly name?: string = '';

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly country?: string = '';

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  readonly value?: number = 0;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  readonly budget?: number = 5000000;

  // @ApiProperty({ type: PlayerEntity[] })
  @IsOptional()
  readonly players?: PlayerEntity[] | undefined;
}
