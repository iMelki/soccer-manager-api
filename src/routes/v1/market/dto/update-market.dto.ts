import { PartialType } from '@nestjs/swagger';
import CreateMarketDto from './create-market.dto';

export default class UpdateMarketDto extends PartialType(CreateMarketDto) {}
