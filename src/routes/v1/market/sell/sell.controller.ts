import {
  Controller, Get, Post, Body, Patch, Param, Delete, // UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse, getSchemaPath,
} from '@nestjs/swagger';
// import JwtAccessGuard from '@guards/jwt-access.guard';
import SellService from './sell.service';
// import CreateSellDto from './dto/create-sell.dto';
import UpdateSellDto from './dto/update-sell.dto';
import SetPlayerForSaleRequest from './dto/player-for-sale-request.dto';
import SellEntity from './entities/sell.entity';

@ApiTags('Sell')
// @UseInterceptors(WrapResponseInterceptor)
// @ApiExtraModels(JwtTokensDto)
@Controller()
export default class SellController {
  constructor(private readonly sellService: SellService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(SellEntity),
        },
      },
    },
    description: '200. Success. Team Created.',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'id', type: String })
  // @UseGuards(JwtAccessGuard)
  // @Serialize(TeamResponseEntity)
  @Post(':id')
  create(@Body() playerSellDto: SetPlayerForSaleRequest) {
    return this.sellService.sellPlayer(playerSellDto);
  }

  @Get()
  findAll() {
    return this.sellService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellDto: UpdateSellDto) {
    return this.sellService.update(+id, updateSellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellService.remove(+id);
  }
}
