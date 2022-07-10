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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateVaccinationDto } from "./dto/create-vaccination.dto";
import { UpdateVaccinationDto } from "./dto/update-vaccination.dto";
import { AuthGuard } from "@nestjs/passport";
import { Vaccination } from "./entities/vaccination.entity";
import { VaccinationService } from "./vaccination.service";

@ApiTags("Vaccination")
@Controller("vaccination")
@ApiBearerAuth()
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createVaccination(@Body() createVaccinationDto: CreateVaccinationDto): Promise<Vaccination> {
    return this.vaccinationService.createVaccination(createVaccinationDto);
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  findVaccinationById(@Param("id", ParseUUIDPipe) id: string): Promise<Vaccination> {
    return this.vaccinationService.findOne(id);
  }

  @Get("user/:id")
  @UseGuards(AuthGuard())
  findVaccinationsByUserId(@Param("id", ParseUUIDPipe) id: string): Promise<Vaccination[]> {
    return this.vaccinationService.findAllUserVaccinesByUserId(id);
  }

  @Get(":skip/:take")
  @UseGuards(AuthGuard())
  findAllVaccinations(
    @Param("skip") skip: string,
    @Param("take") take: string
  ): Promise<[Vaccination[], number]> {
    return this.vaccinationService.findAll(skip, take);
  }

  @Patch(":vaccinationId")
  updateVaccination(
    @Param("vaccinationId", ParseUUIDPipe) vaccinationId: string,
    @Body() updateVaccinationDto: UpdateVaccinationDto
  ): Promise<Vaccination> {
    return this.vaccinationService.updateVaccination(
      vaccinationId,
      updateVaccinationDto
    );
  }

  @Delete(":userId")
  removeUserVaccinationsByUserId(
    @Param(":userId", ParseUUIDPipe) userId: string
  ): Promise<void> {
    return this.vaccinationService.removeUserVaccinationsByUserId(userId);
  }

  @Post("/booster")
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createBooster(@Body() createVaccinationDto: CreateVaccinationDto): Promise<Vaccination> {
    return this.vaccinationService.createBooster(createVaccinationDto);
  }
}
