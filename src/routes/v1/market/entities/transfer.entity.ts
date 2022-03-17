import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import PlayerEntity from '@v1/players/entities/player.entity';

  @Entity('transfers')
export default class TransferEntity {
      @ApiProperty({ type: String })
      @PrimaryGeneratedColumn()
      readonly id?: number = 1;

      @ApiProperty({ type: Number })
      @Column()
      readonly price?: number = 0;

      //
      @OneToOne(() => PlayerEntity, (player) => player.transfer)
      @JoinColumn()
      readonly player?: PlayerEntity | undefined;
}
