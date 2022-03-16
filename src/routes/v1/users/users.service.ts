import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import SignUpDto from '@v1/auth/dto/sign-up.dto';
import { UpdateResult } from 'typeorm/index';
import TeamsService from '@v1/teams/teams.service';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedUsersInterface } from '@interfaces/paginatedEntity.interface';
import UsersRepository from './users.repository';
import UserEntity from './schemas/user.entity';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly teamsService: TeamsService,
  ) {}

  public async create(user: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userEntity = await this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    // Create a new TEAM
    const team = await this.teamsService.create({
      name: `NEW TEAM ${userEntity?.id}`,
      country: 'USA',
    });

    await this.usersRepository.updateById(userEntity?.id, {
      team,
      verified: true,
    });

    return userEntity;
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getByEmail(email);
  }

  public async getVerifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserByEmail(email);
  }

  public getUnverifiedUserByEmail(email: string): Promise<UserEntity | undefined> {
    return this.usersRepository.getUnverifiedUserByEmail(email);
  }

  public async getById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getById(id);
  }

  public async getVerifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getVerifiedUserById(id);
  }

  public async getUnverifiedUserById(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.getUnverifiedUserById(id);
  }

  update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.updateById(id, data);
  }

  public async getAllVerifiedWithPagination(
    options: PaginationParamsInterface,
  ): Promise<PaginatedUsersInterface> {
    return this.usersRepository.getAllVerifiedWithPagination(options);
  }
}
