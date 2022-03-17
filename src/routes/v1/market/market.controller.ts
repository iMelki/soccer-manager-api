/* eslint-disable import/prefer-default-export */
import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import MarketService from './market.service';
import CreateMarketDto from './dto/create-market.dto';
import UpdateMarketDto from './dto/update-market.dto';

@ApiTags('Market')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
// @ApiExtraModels(TeamEntity)
@Controller()
export default class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  create(@Body() createMarketDto: CreateMarketDto) {
    return this.marketService.create(createMarketDto);
  }

  @Get()
  findAll() {
    return this.marketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketDto: UpdateMarketDto) {
    return this.marketService.update(+id, updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketService.remove(+id);
  }
}
