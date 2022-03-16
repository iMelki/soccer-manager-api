import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import SingleResponseEntity from './single-entity-response.entity';

export default class AllEntitiesResponse<E extends SingleResponseEntity> {
  @ValidateNested({ each: true })
  // eslint-disable-next-line no-undef
  @Type(() => SingleResponseEntity)
  data?: E[] = []

  collectionName?: string = '';

  options?: {
    location: string,
    paginationParams: PaginationParamsInterface,
    totalCount: number,
  }

  constructor() { }
}
