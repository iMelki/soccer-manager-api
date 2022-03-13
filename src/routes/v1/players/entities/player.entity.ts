import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  // Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import TeamEnitity from '@v1/teams/schemas/team.entity';
import { Position } from '../enums/position.enum';

  @Entity('players')
export default class PlayerEntity {
      @ApiProperty({ type: String })
      @PrimaryGeneratedColumn()
      readonly id: number = 1;

      @ApiProperty({ type: String, maxLength: 64 })
      @Column({ length: 64 })
      readonly first: string = '';

      @ApiProperty({ type: String, maxLength: 64 })
      @Column({ length: 64 })
      readonly last: string = '';

      @ApiProperty({ type: Number })
      @Column()
      readonly age: number = 18 + Math.round(22 * Math.random());

      @ApiProperty({ type: String, maxLength: 64 })
      @Column({ length: 64 })
      readonly country: string = '';

      // @ApiProperty({ type: 'enum', enum: Position, default: Position.Goalkeeper })
      @Column({ type: 'enum', enum: Position, default: Position.Goalkeeper })
      readonly position: Position = Position.Goalkeeper;

      @ApiProperty({ type: Number })
      @Column()
      readonly value: number = 1000000;

      @ManyToOne(() => TeamEnitity, (team) => team.players, { onDelete: 'CASCADE' })
      readonly team: TeamEnitity | undefined;
}
