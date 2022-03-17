/* eslint-disable import/prefer-default-export */
import {
  Controller, Get, Param,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import MarketService from './market.service';

@ApiTags('Market')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
// @ApiExtraModels(TeamEntity)
@Controller()
export default class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  findAll() {
    return this.marketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketService.findOne(+id);
  }
}
