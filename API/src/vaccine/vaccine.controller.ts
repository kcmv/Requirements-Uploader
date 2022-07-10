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
  ParseUUIDPipe,
} from "@nestjs/common";
import { VaccineService } from "./vaccine.service";
import { CreateVaccineDto } from "./dto/create-vaccine.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Vaccine } from "./entities/vaccine.entity";
import { UpdateVaccineDto } from "./dto/update-vaccine.dto";

@ApiTags("Vaccine")
@Controller("vaccine")
@ApiBearerAuth()
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  create(@Body() createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    return this.vaccineService.create(createVaccineDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(): Promise<Vaccine[]> {
    return this.vaccineService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<Vaccine> {
    return this.vaccineService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard())
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateVaccineDto: UpdateVaccineDto
  ): Promise<Vaccine> {
    return this.vaccineService.update(id, updateVaccineDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.vaccineService.remove(id);
  }
}
