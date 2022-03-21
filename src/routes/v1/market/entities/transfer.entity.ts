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

      // , (player) => player.transfer
      @OneToOne(() => PlayerEntity)
      @JoinColumn()
      readonly player?: PlayerEntity | undefined;

      public toString() {
        return `Player #${this.id} for ${this.price} : /n ${this.player?.first} ${this.player?.last}`;
      }
}
