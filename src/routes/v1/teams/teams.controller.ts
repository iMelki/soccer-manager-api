import {
  Controller, Get, Post, Body, Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
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

import Serialize from '@decorators/serialization.decorator';
import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';
import { PaginatedEntitiesInterface } from '@interfaces/paginatedEntity.interface';
import TeamEntity from './schemas/team.entity';
import TeamsService from './teams.service';
import CreateTeamDto from './dto/create-team.dto';
import UpdateTeamDto from './dto/update-team.dto';
import PaginationUtils from '../../../utils/pagination.utils';
import ResponseUtils from '../../../utils/response.utils';
import TeamResponseEntity from './entities/team-response.entity';
import AllTeamsResponseEntity from './entities/all-team-response.entity';

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
  @Serialize(TeamResponseEntity)
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
  @Serialize(AllTeamsResponseEntity)
  @Get()
  public async findAll(@Query() query: any) {
    const paginationParams: PaginationParamsInterface | false = PaginationUtils.normalizeParams(query.page);
    if (!paginationParams) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const paginatedUsers: PaginatedEntitiesInterface<TeamEntity> = await this.teamsService.findAllWithPagination(paginationParams);

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
  @Serialize(TeamResponseEntity)
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
  @Serialize(TeamResponseEntity)
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
  // @Serialize(UserResponseEntity)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
