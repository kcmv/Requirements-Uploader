import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateVaccineDto } from "./dto/create-vaccine.dto";
import { UpdateVaccineDto } from "./dto/update-vaccine.dto";
import { Vaccine } from "./entities/vaccine.entity";

@EntityRepository(Vaccine)
export class VaccineRepository extends Repository<Vaccine> {
  /**
   * @description create vaccine
   * @param createVaccineDto
   * @returns Promise<Vaccine>
   */
  async createVaccine(createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    const vaccine = new Vaccine();

    const { name, field_id, isbooster, dose_name, required_dosage } =
      createVaccineDto;

    vaccine.name = name;
    vaccine.field_id = field_id;
    vaccine.isbooster = isbooster;
    vaccine.dose_name = dose_name;
    vaccine.required_dosage = required_dosage;

    await vaccine.save();

    return vaccine;
  }

  /**
   * @description find one vaccine by id
   * @param id
   * @returns
   */
  async getOne(id: string): Promise<Vaccine> {
    const vaccine = await Vaccine.findOne(id);

    if (!vaccine) {
      throw new NotFoundException(`Vaccine id ${id} not found.`);
    }

    return vaccine;
  }

  /**
   * @description get all vaccines
   * @returns Promise<Vaccine[]>
   */
  async findAll(): Promise<Vaccine[]> {
    const vaccines = await Vaccine.find({
      order: {
        createdAt: "DESC",
      },
    });

    if (!vaccines) {
      throw new NotFoundException(`Vaccines not found`);
    }

    return vaccines;
  }

  async updateVaccine(
    id: string,
    updateVaccineDto: UpdateVaccineDto
  ): Promise<Vaccine> {
    const vaccine = await this.getOne(id);

    const { name, field_id, isbooster, dose_name, required_dosage } =
      updateVaccineDto;

    vaccine.name = name!;
    vaccine.field_id = field_id!;
    vaccine.isbooster = isbooster!;
    vaccine.dose_name = dose_name!;
    vaccine.required_dosage = required_dosage!;

    await vaccine.save();

    return vaccine;
  }

  /**
   * @description delete vaccine
   * @param id
   */
  async deleteVaccine(id: string): Promise<void> {
    await this.getOne(id);

    const result = await Vaccine.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Vaccine id ${id} not found.`);
    }
  }
}
