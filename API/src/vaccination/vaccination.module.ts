import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CmsUsersModule } from "src/cms-users/cms-users.module";
import { VaccinationController } from "./vaccination.controller";
import { VaccinationService } from "./vaccination.service";
import { VaccinationRepository } from "./vaccination.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationRepository]), CmsUsersModule],
  controllers: [VaccinationController],
  providers: [VaccinationService],
})
export class VaccinationModule {}
