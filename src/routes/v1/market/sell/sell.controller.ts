import {
  Controller, Post, Body, UseGuards, // UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath,
} from '@nestjs/swagger';
import JwtTokensDto from '@v1/auth/dto/jwt-tokens.dto';
import JwtAccessGuard from '@guards/jwt-access.guard';
import SellService from './sell.service';
import SetPlayerForSaleRequest from './dto/player-for-sale-request.dto';
import TransferEntity from '../entities/transfer.entity';

@ApiTags('Market')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(JwtTokensDto)
@Controller()
export default class SellController {
  constructor(private readonly sellService: SellService) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TransferEntity),
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
  @UseGuards(JwtAccessGuard)
  // @Serialize(TeamResponseEntity)
  @Post()
  create(
    @Body() playerSellDto: SetPlayerForSaleRequest,
  ) {
    return this.sellService.sellPlayer(playerSellDto);
  }
}
