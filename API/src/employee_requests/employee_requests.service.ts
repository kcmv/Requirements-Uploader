import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Answer } from "src/answers/entities/answer.entity";
import { Purpose } from "src/purpose/entities/purpose.entity";
import { PurposeFieldType } from "src/purpose_field_type/entities/purpose_field_type.entity";
import { dateCompleted, filterAnswers, getOnePurpose } from "src/utils";
import {
  CreateEmployeeRequestDto,
  FindUserPurposeDto,
} from "./dto/create-employee_request.dto";
import { EmployeeRequest } from "./entities/employee_request.entity";
import { getLoginToken, getAveMonthlyBonus } from "src/services/onPremise";
import { UpdateEmployeeRequestDto } from "./dto/update-employee_request.dto";

@Injectable()
export class EmployeeRequestsService {
  /**
   * @description create employee request
   * @param createEmployeeRequestDto
   * @returns
   */
  async create(
    createEmployeeRequestDto: CreateEmployeeRequestDto
  ): Promise<EmployeeRequest> {
    const {
      employee_no,
      email,
      purpose_id,
      answers,
      completed,
      password,
      emailToUse,
      withCompensation,
    } = createEmployeeRequestDto;

    let averageBonus;

    if (withCompensation) {
      const { success, accessToken } = await getLoginToken(
        employee_no,
        password
      );

      if (!success) {
        throw new UnauthorizedException("Password is incorrect");
      }

      averageBonus = withCompensation
        ? await getAveMonthlyBonus(accessToken)
        : 0;
    }

    const isPurposeExists = await this.findUserPurpose({
      employee_no,
      purpose: purpose_id,
    });

    if (isPurposeExists.length > 0 && !isPurposeExists[0].completed) {
      throw new ConflictException(
        `Pending request exists. Please wait for the previous request to be completed.`
      );
    }

    // find purpose entity value
    const purpose = await Purpose.findOne(purpose_id);

    if (!purpose) {
      throw new NotFoundException(`Purpose ID ${purpose_id} not found.`);
    }

    // save answers and push all to answer_list
    let answer_list = [];

    if (answers.length > 0) {
      for (let ans of answers) {
        // find purpose id
        const purpose_field_type: any = await PurposeFieldType.findOne(
          ans.purpose_field_type
        );

        let answer = new Answer();
        answer.answer = ans.answer;
        answer.purpose_field_type = purpose_field_type;

        await answer.save();

        answer_list.push(answer);
      }
    }

    const employee_request = new EmployeeRequest();
    employee_request.employee_no = employee_no;
    employee_request.email = email;
    employee_request.purposes = [purpose];
    employee_request.answers = answer_list;
    employee_request.emailToUse = emailToUse;
    employee_request.aveMonthlyBonus = averageBonus;
    employee_request.completed = completed;

    await employee_request.save();

    return employee_request;
  }

  /**
   * @description find user purpose
   * @param finduserPurpose
   * @returns
   */
  async findUserPurpose(finduserPurpose: FindUserPurposeDto): Promise<any> {
    const { employee_no, purpose } = finduserPurpose;
    try {
      const result = await EmployeeRequest.find({
        where: {
          employee_no,
        },
        relations: ["purposes"],
      });

      const isPurposeExists = getOnePurpose(result, purpose);

      return isPurposeExists;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * @description get all employee request
   * @param skip
   * @param take
   * @returns
   */
  async findAll(skip: number, take: number): Promise<any[]> {
    const result = await EmployeeRequest.findAndCount({
      skip: take * (skip - 1),
      take,
      relations: ["purposes"],
    });

    const filterResult = filterAnswers(result[0]);

    return filterResult;
    
  }

  /**
   * @description get all incomplete
   * @returns
   */
  async findAllIncomplete(): Promise<EmployeeRequest[]> {
    const result = await EmployeeRequest.find({
      where: {
        completed: false,
      },
      relations: ["purposes"],
      take: 20,
    });

    const filterResult = filterAnswers(result);

    return filterResult;
  }

  /**
   * @description get all user purpose
   * @param employee_no
   * @returns
   */
  async findAllUserPurpose(employee_no: string): Promise<EmployeeRequest> {
    const result = await EmployeeRequest.find({
      where: {
        employee_no,
      },
    });

    const filterResult = filterAnswers(result);

    return filterResult;
  }

  /**
   * @description find one
   * @param id
   * @returns
   */
 
  async findOne(id: string): Promise<EmployeeRequest> {
    const result = await EmployeeRequest.findOne(id);

    if (!result) {
      throw new NotFoundException(`Employee request id ${id} not found.`)
    }

    return result
  }

  /**
   * @description update one
   * @param id
   * @returns
   */
  async update(id: string): Promise<EmployeeRequest> {
    const employee_request: any = await this.findOne(id);

    (employee_request.result.completed = true),
      (employee_request.result.completedDateTime = dateCompleted());

    await employee_request.result.save();

    return employee_request.result;
  }

  /**
   * @description remove by id
   * @param id
   * @returns
   */
  async remove(id: string): Promise<void> {
    const employee_request = await EmployeeRequest.delete(id);

    if (employee_request.affected === 0) {
      throw new NotFoundException(`Employee request id ${id} not found.`);
    }
  }
}
