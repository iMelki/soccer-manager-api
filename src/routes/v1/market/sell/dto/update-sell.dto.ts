import { PartialType } from '@nestjs/swagger';
import CreateSellDto from './create-sell.dto';

export default class UpdateSellDto extends PartialType(CreateSellDto) {}
