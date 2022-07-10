import { Module } from "@nestjs/common";
import { VaccineService } from "./vaccine.service";
import { VaccineController } from "./vaccine.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineRepository } from "./vaccine.repository";
import { CmsUsersModule } from "src/cms-users/cms-users.module";

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRepository]), CmsUsersModule],
  controllers: [VaccineController],
  providers: [VaccineService],
})
export class VaccineModule {}
