import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { PurposeFieldTypeService } from "./purpose_field_type.service";
import { CreatePurposeFieldTypeDto } from "./dto/create-purpose_field_type.dto";
import { UpdatePurposeFieldTypeDto } from "./dto/update-purpose_field_type.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RouteGuard } from "src/guards/auth.guard";

@ApiBearerAuth()
@ApiTags("Purpose Field Type")
@UseGuards(new RouteGuard())
@Controller("purpose-field-type")
export class PurposeFieldTypeController {
  constructor(
    private readonly purposeFieldTypeService: PurposeFieldTypeService
  ) {}

  @Post()
  create(@Body() createPurposeFieldTypeDto: CreatePurposeFieldTypeDto) {
    return this.purposeFieldTypeService.create(createPurposeFieldTypeDto);
  }

  @Get()
  findAll() {
    return this.purposeFieldTypeService.findAll();
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  findOne(@Param("id") id: string) {
    return this.purposeFieldTypeService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePurposeFieldTypeDto: UpdatePurposeFieldTypeDto
  ) {
    return this.purposeFieldTypeService.update(+id, updatePurposeFieldTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.purposeFieldTypeService.remove(+id);
  }
}
