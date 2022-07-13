import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { FieldTypeService } from './field_type.service';
import { CreateFieldTypeDto } from './dto/create-field_type.dto';
import { UpdateFieldTypeDto } from './dto/update-field_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RouteGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Field Type')
@UseGuards(new RouteGuard())
@Controller('field-type')
export class FieldTypeController {
  constructor(private readonly fieldTypeService: FieldTypeService) {}

  @Post()
  create(@Body() createFieldTypeDto: CreateFieldTypeDto) {
    return this.fieldTypeService.create(createFieldTypeDto);
  }

  @Get()
  findAll() {
    return this.fieldTypeService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: string) {
    return this.fieldTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldTypeDto: UpdateFieldTypeDto) {
    return this.fieldTypeService.update(+id, updateFieldTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldTypeService.remove(id);
  }
}
