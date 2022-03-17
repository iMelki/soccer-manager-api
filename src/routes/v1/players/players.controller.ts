import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import JwtAccessGuard from '@guards/jwt-access.guard';
import PlayersService from './players.service';
import CreatePlayerDto from './dto/create-player.dto';
import UpdatePlayerDto from './dto/update-player.dto';
import PlayerEntity from './entities/player.entity';

@ApiTags('Players')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(PlayerEntity)
@Controller()
export default class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
  ) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlayerEntity),
        },
      },
    },
    description: '200. Success. Player Created.',
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
  // @Serialize(AllUsersResponseEntity)
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlayerEntity),
        },
      },
    },
    description: '200. Success. Returns all Players.',
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
  // @Serialize(AllUsersResponseEntity)
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlayerEntity),
        },
      },
    },
    description: '200. Success. Returns a Player',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Player was not found',
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
  @UseGuards(JwtAccessGuard)
  // @Serialize(AllUsersResponseEntity)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlayerEntity),
        },
      },
    },
    description: '200. Success. Updated a Player',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Player was not found',
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
  @UseGuards(JwtAccessGuard)
  // @Serialize(AllUsersResponseEntity)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(PlayerEntity),
        },
      },
    },
    description: '200. Success. Deleted a Player',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Player was not found',
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
  @UseGuards(JwtAccessGuard)
  // @Serialize(AllUsersResponseEntity)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}
