import { PartialType } from '@nestjs/swagger';
import { CreatePurposeFieldTypeDto } from './create-purpose_field_type.dto';

export class UpdatePurposeFieldTypeDto extends PartialType(CreatePurposeFieldTypeDto) {}
