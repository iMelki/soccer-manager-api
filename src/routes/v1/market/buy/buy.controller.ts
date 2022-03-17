import {
  Controller, Post, Body, UseGuards, // UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath,
} from '@nestjs/swagger';
import JwtTokensDto from '@v1/auth/dto/jwt-tokens.dto';
import JwtAccessGuard from '@guards/jwt-access.guard';
import BuyService from './buy.service';
import TransferEntity from '../entities/transfer.entity';
import PlayerBuyDto from './dto/player-buy.dto';
import AuthBearer from '@decorators/auth-bearer.decorator';

@ApiTags('Market')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(JwtTokensDto)
@Controller('/buy')
export default class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @ApiBody({ type: PlayerBuyDto })
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
    @AuthBearer() token: string,
    @Body() playerBuyDto: PlayerBuyDto,
  ) {
    return this.buyService.buyPlayer({
      buyerToken: token,
      transferId: playerBuyDto.transferId,
    });
  }
}
