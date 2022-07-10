import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateVaccinationDto } from "./dto/create-vaccination.dto";
import { UpdateVaccinationDto } from "./dto/update-vaccination.dto";
import { Vaccination } from "./entities/vaccination.entity";
import { VaccinationRepository } from "./vaccination.repository";

@Injectable()
export class VaccinationService {
  constructor(
    @InjectRepository(VaccinationRepository)
    private vaccinationRepository: VaccinationRepository
  ) {}

  createVaccination(createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationRepository.createVaccination(createVaccinationDto);
  }

  findAll(skip: string, take: string): Promise<[Vaccination[], number]> {
    return this.vaccinationRepository.getVaccinations(skip, take);
  }

  findOne(id: string): Promise<Vaccination> {
    return this.vaccinationRepository.getOne(id);
  }

  updateVaccination(vaccinationId: string, updateVaccination: UpdateVaccinationDto): Promise<Vaccination> {
    return this.vaccinationRepository.updateVaccination(vaccinationId,updateVaccination)
  }

  createBooster(createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationRepository.createBooster(createVaccinationDto);
  }

  findAllUserVaccinesByUserId(userId: string): Promise<Vaccination[]> {
    return this.vaccinationRepository.getAllUserVaccinesByUserId(userId);
  }

  removeUserVaccinationsByUserId(userId: string): Promise<void> {
    return this.vaccinationRepository.removeUserVaccinationsByUserId(userId);
  }
}
