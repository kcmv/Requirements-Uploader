import { Module } from "@nestjs/common";
import { EmployeeRequestsService } from "./employee_requests.service";
import { EmployeeRequestsController } from "./employee_requests.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" })
  ],
  controllers: [EmployeeRequestsController],
  providers: [EmployeeRequestsService,JwtStrategy],
  exports: [
    JwtStrategy,
    PassportModule, // exported to use in other modules
  ],
})
export class EmployeeRequestsModule {}
