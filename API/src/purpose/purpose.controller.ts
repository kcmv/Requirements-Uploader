import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PurposeService } from './purpose.service';
import { CreatePurposeDto } from './dto/create-purpose.dto';
import { UpdatePurposeDto } from './dto/update-purpose.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RouteGuard } from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('Purpose')
@UseGuards(new RouteGuard())
@Controller('purpose')
export class PurposeController {
  constructor(private readonly purposeService: PurposeService) {}

  @Post()
  create(@Body() createPurposeDto: CreatePurposeDto) {
    return this.purposeService.create(createPurposeDto);
  }

  @Get()
  findAll() {
    return this.purposeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purposeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurposeDto: UpdatePurposeDto) {
    return this.purposeService.update(+id, updatePurposeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purposeService.remove(id);
  }
}
