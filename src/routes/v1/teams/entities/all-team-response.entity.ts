import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import TeamResponseEntity from './team-response.entity';

export default class AllTeamsResponseEntity {
  @ValidateNested({ each: true })
  @Type(() => TeamResponseEntity)
  data?: [] = []

  collectionName?: string = '';

  options?: {
    location: string,
    paginationParams: PaginationParamsInterface,
    totalCount: number,
  }
}
