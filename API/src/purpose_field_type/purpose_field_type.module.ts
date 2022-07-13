import { Module } from "@nestjs/common";
import { PurposeFieldTypeService } from "./purpose_field_type.service";
import { PurposeFieldTypeController } from "./purpose_field_type.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "src/employee_requests/jwt.strategy";
@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  controllers: [PurposeFieldTypeController],
  providers: [PurposeFieldTypeService, JwtStrategy],
  exports: [PurposeFieldTypeService]
})
export class PurposeFieldTypeModule {}
