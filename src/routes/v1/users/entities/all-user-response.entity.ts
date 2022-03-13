import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import UserResponseEntity from './user-response.entity';

export default class AllUsersResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => UserResponseEntity)
  data?: [] = []

  collectionName?: string = '';

  options?: {
    location: string,
    paginationParams: PaginationParamsInterface,
    totalCount: number,
  }
}
