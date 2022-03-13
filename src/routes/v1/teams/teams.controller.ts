import {
  Controller, Get, Post, Body, Patch,
  Param,
  Delete,
  // UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

// import JwtAccessGuard from '@guards/jwt-access.guard';

import TeamEntity from './schemas/team.entity';
import TeamsService from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
// import Serialize from '@decorators/serialization.decorator';

@ApiTags('Teams')
@ApiBearerAuth()
// @UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(TeamEntity)
@Controller('teams')
export default class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

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
    description: '200. Success. Returns all users',
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
  // @UseGuards(JwtAccessGuard)
  // @Serialize(AllUsersResponseEntity)
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
