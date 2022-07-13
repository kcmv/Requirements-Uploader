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
  Query,
  UseGuards,
  ParseIntPipe,
  ParseUUIDPipe,
} from "@nestjs/common";
import { EmployeeRequestsService } from "./employee_requests.service";
import {
  CreateEmployeeRequestDto,
  FindUserPurposeDto,
} from "./dto/create-employee_request.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RouteGuard } from "src/guards/auth.guard";
import { EmployeeRequest } from "./entities/employee_request.entity";

@ApiBearerAuth()
@ApiTags("Employee Requests")
@UseGuards(new RouteGuard())
@Controller("employee-requests")
export class EmployeeRequestsController {
  constructor(
    private readonly employeeRequestsService: EmployeeRequestsService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEmployeeRequestDto: CreateEmployeeRequestDto): Promise<EmployeeRequest> {
    return this.employeeRequestsService.create(createEmployeeRequestDto);
  }

  @Get("/employee_purpose/:employee_no")
  findAllUserPurpose(@Param("employee_no") eid: string): Promise<any> {
    return this.employeeRequestsService.findAllUserPurpose(eid);
  }

  @Get("/user/purpose/:id/:pid")
  findUserPurpose(
    @Query()
    query: FindUserPurposeDto
  ): Promise<EmployeeRequest> {
    return this.employeeRequestsService.findUserPurpose(query);
  }

  @Get("/incomplete")
  findAllIncomplete(): Promise<EmployeeRequest[]> {
    return this.employeeRequestsService.findAllIncomplete();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<EmployeeRequest> {
    return this.employeeRequestsService.findOne(id);
  }

  @Get(":skip/:take")
  findAll(@Param("skip", ParseIntPipe) skip: number, @Param("take", ParseIntPipe) take: number): Promise<any[]> {
    return this.employeeRequestsService.findAll(skip, take);
  }

  @Patch(":id")
  update(@Param("id", ParseUUIDPipe) id: string): Promise<EmployeeRequest> {
    return this.employeeRequestsService.update(id);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.employeeRequestsService.remove(id);
  }
}
