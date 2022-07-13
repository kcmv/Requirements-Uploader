import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FieldTypeService } from './field_type.service';
import { CreateFieldTypeDto } from './dto/create-field_type.dto';
import { UpdateFieldTypeDto } from './dto/update-field_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RouteGuard } from 'src/guards/auth.guard';
import { FieldType } from './entities/field_type.entity';

@ApiBearerAuth()
@ApiTags('Field Type')
@UseGuards(new RouteGuard())
@Controller('field-type')
export class FieldTypeController {
  constructor(private readonly fieldTypeService: FieldTypeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createFieldTypeDto: CreateFieldTypeDto): Promise<FieldType> {
    return this.fieldTypeService.create(createFieldTypeDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll(): Promise<FieldType[]> {
    return this.fieldTypeService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FieldType> {
    return this.fieldTypeService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateFieldTypeDto: UpdateFieldTypeDto): Promise<FieldType> {
    return this.fieldTypeService.update(+id, updateFieldTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.fieldTypeService.remove(id);
  }
}
