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
} from "@nestjs/common";
import { EmployeeRequestsService } from "./employee_requests.service";
import {
  CreateEmployeeRequestDto,
  FindUserPurposeDto,
} from "./dto/create-employee_request.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RouteGuard } from "src/guards/auth.guard";

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
  create(@Body() createEmployeeRequestDto: CreateEmployeeRequestDto) {
    return this.employeeRequestsService.create(createEmployeeRequestDto);
  }

  @Get("/employee_purpose/:employee_no")
  findAllUserPurpose(@Param("employee_no") eid: string) {
    return this.employeeRequestsService.findAllUserPurpose(eid);
  }

  @Get("/user/purpose/:id/:pid")
  findUserPurpose(
    @Query()
    query: FindUserPurposeDto
  ) {
    return this.employeeRequestsService.findUserPurpose(query);
  }

  @Get("/incomplete")
  findAllIncomplete() {
    return this.employeeRequestsService.findAllNotCompleted();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeRequestsService.findOne(id);
  }

  @Get(":skip/:take")
  findAll(@Param("skip") skip: string, @Param("take") take: string) {
    return this.employeeRequestsService.findAll(skip, take);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.employeeRequestsService.update(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeRequestsService.remove(id);
  }
}
