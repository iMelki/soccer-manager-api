/* eslint-disable import/prefer-default-export */
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import {
  BadRequestException,
  Controller, Get, Param, Query,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import MarketService from './market.service';
import PaginationUtils from '../../../utils/pagination.utils';
import ResponseUtils from '../../../utils/response.utils';
import TransferEntity from './entities/transfer.entity';

@ApiTags('Market')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
// @ApiExtraModels(TeamEntity)
@Controller()
export default class MarketController {
  constructor(
    private readonly marketService: MarketService,
  ) {}

  @Get()
  public async findAll(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false = PaginationUtils.normalizeParams(query.page);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedEntitiesInterface<TransferEntity> = await this.marketService.getAllDetailedWithPagination(paginationParams);

    return ResponseUtils.success(
      'users',
      paginatedUsers.paginatedResult,
      {
        location: 'users',
        paginationParams,
        totalCount: paginatedUsers.totalCount,
      },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketService.findOne(+id);
  }
}
