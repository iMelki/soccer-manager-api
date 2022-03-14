import { PartialType } from '@nestjs/swagger';
import CreateTeamDto from './create-team.dto';

export default class UpdateTeamDto extends PartialType(CreateTeamDto) {}
