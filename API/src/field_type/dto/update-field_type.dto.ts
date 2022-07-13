import { PartialType } from '@nestjs/swagger';
import { CreateFieldTypeDto } from './create-field_type.dto';

export class UpdateFieldTypeDto extends PartialType(CreateFieldTypeDto) {}
