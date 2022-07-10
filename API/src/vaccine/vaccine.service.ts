import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateVaccineDto } from "./dto/create-vaccine.dto";
import { UpdateVaccineDto } from "./dto/update-vaccine.dto";
import { Vaccine } from "./entities/vaccine.entity";
import { VaccineRepository } from "./vaccine.repository";

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(VaccineRepository)
    private vaccineRepository: VaccineRepository
  ) {}
  create(createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    return this.vaccineRepository.createVaccine(createVaccineDto);
  }

  findAll(): Promise<Vaccine[]> {
    return this.vaccineRepository.findAll();
  }

  findOne(id: string): Promise<Vaccine> {
    return this.vaccineRepository.getOne(id);
  }

  update(id: string, updateVaccinationDto: UpdateVaccineDto): Promise<Vaccine> {
    return this.vaccineRepository.updateVaccine(id, updateVaccinationDto);
  }

  remove(id: string): Promise<void> {
    return this.vaccineRepository.deleteVaccine(id);
  }
}
