import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsNumber, IsOptional, IsString, MaxLength,
} from 'class-validator';
import { Position } from '../enums/position.enum';

export default class CreatePlayerDto {
  constructor(body: CreatePlayerDto | null = null) {
    if (body) {
      Object.assign(this, body);
    }
  }

    @ApiProperty({ type: String })
    @MaxLength(64)
    @IsString()
    readonly first: string = '';

    @ApiProperty({ type: String })
    @MaxLength(64)
    @IsString()
    readonly last?: string = '';

    @ApiPropertyOptional({ type: Number })
    @IsNumber()
    @IsOptional()
    readonly age?: number = 18 + Math.round(22 * Math.random());

    @ApiProperty({ type: String })
    @MaxLength(64)
    @IsString()
    @IsOptional()
    readonly country?: string = '';

    @ApiPropertyOptional({ type: 'enum', enum: Position, default: Position.Goalkeeper })
    @IsOptional()
    readonly position?: Position | undefined = Position.Goalkeeper;

    @ApiPropertyOptional({ type: Number })
    @IsOptional()
    @IsNumber()
    readonly value?: number = 1000000;
}
