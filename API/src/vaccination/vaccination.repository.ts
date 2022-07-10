import { ConflictException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateVaccinationDto } from "./dto/create-vaccination.dto";
import { Vaccination } from "./entities/vaccination.entity";
import {
  checkif1Dosage,
  checkIfBoosterExists,
  checkIfBoosterOrderExists,
  checkUploadedBoosterOrder,
  checkUserBoosterCount,
  checkUserDoseExists,
} from "src/utils";
import { UpdateVaccinationDto } from "./dto/update-vaccination.dto";
import { CmsUser } from "src/cms-users/entities/cms-user.entity";
import * as moment from "moment";

@EntityRepository(Vaccination)
export class VaccinationRepository extends Repository<Vaccination> {
  /**
   * @description create user vaccination
   * @param createVaccination
   * @returns any
   */
  async createVaccination(
    createVaccination: CreateVaccinationDto
  ): Promise<any> {
    const { dose, date_given, vaccine_type, user_id, dose_number, link } =
      createVaccination;

    const user = await CmsUser.findOne({ id: user_id });

    if (!user) {
      throw new NotFoundException(`User id ${user_id} not found.`);
    } else {
      const vaccines = await this.getAllUserVaccinesByUserId(user_id);

      // check if dose 1 is uploaded before dose 2
      if (vaccines.length === 0 && parseInt(dose) === 2) {
        throw new ConflictException(`Please upload dose 1 first.`);
      }

      // Check dose if exists
      if (checkUserDoseExists(vaccines, dose)) {
        throw new ConflictException(
          `Vaccination already exists. To re-upload, click "Update`
        );
      }

      const vaccination = new Vaccination();

      vaccination.dose = parseInt(dose);
      vaccination.date_given = new Date(date_given);
      vaccination.link = link;
      vaccination.vaccine_type = vaccine_type;
      vaccination.status = 2;
      vaccination.dose_number = dose_number;
      vaccination.view_status = "NEW";
      vaccination.createdAt = moment().toDate();
      vaccination.user = user_id;

      await vaccination.save();

      return vaccination;
    }
  }

  /**
   * @description get all vaccinations
   * @returns Promise<Vaccination[]>
   */
  async getVaccinations(skip: string, take: string): Promise<[Vaccination[], number]>{
    const vaccinations = Vaccination.findAndCount({
      skip: parseInt(take) * (parseInt(skip) - 1),
      take: parseInt(take),
      relations: ["user"],
    });

    if (!vaccinations) {
      throw new NotFoundException(`Vaccinations not found`);
    }

    return vaccinations;
  }

  /**
   * @description Find single vaccination by id
   * @param id
   * @returns Promise<Vaccination>
   */
  async getOne(id: string): Promise<Vaccination> {
    const vaccination = await Vaccination.findOne(id);

    if (!vaccination) {
      throw new NotFoundException(`Vaccination id ${id} not found.`);
    }

    return vaccination;
  }

  /**
   * @description check if user vaccine exists
   * @param userId
   * @returns any
   */
  async getAllUserVaccinesByUserId(userId: string) {
    const vaccine = await Vaccination.find({
      relations: ["user"],
      where: {
        user: userId,
      },
    });
    return vaccine;
  }


  /**
   * @description delete vaccinations by user id
   * @param user_id
   */
   async removeUserVaccinationsByUserId(user_id: string): Promise<void> {
    const user = await Vaccination.createQueryBuilder()
      .delete()
      .where("userId = :id", { id: user_id })
      .execute();

    if (user.affected === 0) {
      throw new NotFoundException(`User id ${user_id} not found.`);
    }
  }

  /**
   * @description create user booster
   * @param createBooster
   * @returns any
   */
  async createBooster(createBooster: CreateVaccinationDto): Promise<Vaccination> {
    const { date_given, vaccine_type, user_id, dose_number, link } =
    createBooster;

    const user = await CmsUser.findOne({ id: user_id });

    if (!user) {
      throw new NotFoundException(`User id ${user_id} not found.`);
    } else {
      const vaccines = await this.getAllUserVaccinesByUserId(user_id);
      const boosterCount = checkUserBoosterCount(vaccines);
      const boosterCountPlusOne = boosterCount.count + 1;
      const vaccine_length = vaccines.filter(
        (item: any) => item.vaccine_type["isbooster"] === false
      ).length;

      if (
        (vaccine_length !== 2 && !checkif1Dosage(vaccines)) ||
        vaccine_length === 0
      ) {
        throw new ConflictException(
          `Incomplete vaccination. Please complete all before uploading booster.`
        );
      }

      if (checkIfBoosterExists(vaccines, vaccine_type)) {
        throw new ConflictException(
          'Booster already exists. To re-upload, click "Update'
        );
      }

      if (
        boosterCount.count === 0 &&
        boosterCountPlusOne !== parseInt(checkUploadedBoosterOrder(dose_number))
      ) {
        throw new ConflictException(`Please upload previous booster first.`);
      }

      // check if booster order already exists
      if (
        checkIfBoosterOrderExists(
          boosterCount.boosters,
          checkUploadedBoosterOrder(dose_number)
        ).length > 0
      ) {
        throw new ConflictException(
          `Booster dose already exists. To re-upload, click "Update'`
        );
      }

      const vaccination = new Vaccination();

      vaccination.dose = boosterCount.count + 3;
      vaccination.date_given = new Date(date_given);
      vaccination.link = link;
      vaccination.vaccine_type = vaccine_type;
      vaccination.status = 2;
      vaccination.dose_number = dose_number;
      vaccination.view_status = "NEW";
      vaccination.createdAt = moment().toDate();
      vaccination.user = user_id;

      await vaccination.save();

      return vaccination;
    }
  }

  /**
   * @description update user vaccination
   * @param updateVaccinationDto
   * @returns any
   */
  async updateVaccination(vaccinationId: string, updateVaccinationDto: UpdateVaccinationDto) {
    const { date_given, link, vaccine_type } = updateVaccinationDto;

    const vaccination = await this.getOne(vaccinationId);

    vaccination.date_given = new Date(date_given!);
    vaccination.status = 2;
    vaccination.view_status = "NEW";
    vaccination.link = link!;
    vaccination.vaccine_type = vaccine_type!;

    await vaccination.save();

    return vaccination;
  }

  /**
   * @description delete vaccination by id
   * @param id
   */
  async removeVaccination(id: string): Promise<void> {
    const vaccination = await Vaccination.delete(id);

    if (vaccination.affected === 0) {
      throw new NotFoundException(`Vaccination id ${id} not found.`);
    }
  }

}
