import {
  Controller, Get, Post, Body, Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import JwtAccessGuard from '@guards/jwt-access.guard';

import TeamEntity from './schemas/team.entity';
import TeamsService from './teams.service';
import CreateTeamDto from './dto/create-team.dto';
import UpdateTeamDto from './dto/update-team.dto';
// import Serialize from '@decorators/serialization.decorator';

@ApiTags('Teams')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(TeamEntity)
@Controller()
export default class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
  ) {}

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TeamEntity),
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
  // @Serialize(AllUsersResponseEntity)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TeamEntity),
        },
      },
    },
    description: '200. Success. Returns all Teams',
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
    return this.teamsService.findAll();
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TeamEntity),
        },
      },
    },
    description: '200. Success. Returns a Team',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Team was not found',
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
    return this.teamsService.findOneIncludingPlayers(+id);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TeamEntity),
        },
      },
    },
    description: '200. Success. Updated a Team',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Team was not found',
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
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(TeamEntity),
        },
      },
    },
    description: '200. Success. Deleted a Team',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Team was not found',
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
    return this.teamsService.remove(+id);
  }
}
