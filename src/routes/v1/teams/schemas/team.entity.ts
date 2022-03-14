import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  // Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import UserEntity from '@v1/users/schemas/user.entity';
import PlayerEntity from '@v1/players/entities/player.entity';

@Entity('teams')
export default class TeamEntity {
    @ApiProperty({ type: String })
    @PrimaryGeneratedColumn()
    readonly id: number = 1;

    @ApiProperty({ type: String, maxLength: 64 })
    @Column({ length: 64 })
    readonly name: string = '';

    @ApiProperty({ type: String, maxLength: 64 })
    @Column({ length: 64 })
    readonly country: string = '';

    @ApiProperty({ type: Number })
    @Column()
    readonly value: number = 0;

    @ApiProperty({ type: Number })
    @Column()
    readonly budget?: number = 5000000;

    @OneToOne(() => UserEntity, (user) => user.team, { onDelete: 'CASCADE' })
    readonly user: UserEntity | undefined;

    // @ApiProperty({ type: PlayerEntity[] })
    @OneToMany(() => PlayerEntity, (player) => player.team)
    @JoinColumn()
    readonly players: PlayerEntity[] | undefined;
}
