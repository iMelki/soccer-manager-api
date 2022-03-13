import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('teams')
export default class TeamEntity {
    @ApiProperty({ type: String })
    @PrimaryGeneratedColumn()
    readonly id: number = 1;

    @ApiProperty({ type: String, maxLength: 64 })
    @Column({ length: 64 })
    readonly name: string = '';

    @ApiProperty({ type: Boolean })
    @Column()
    readonly verified: boolean = true;
}
