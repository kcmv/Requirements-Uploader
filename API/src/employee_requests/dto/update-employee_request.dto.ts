import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeRequestDto } from './create-employee_request.dto';

export class UpdateEmployeeRequestDto extends PartialType(CreateEmployeeRequestDto) {}
