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

@Injectable()
export class EmployeeRequestsService {
  async create(createEmployeeRequestDto: CreateEmployeeRequestDto) {
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

    const isPurposeExists = await this.findUserPurpose({employee_no, purpose: purpose_id})

    if (isPurposeExists.length > 0 && !isPurposeExists[0].completed) {
      throw new ConflictException(`Pending request exists. Please wait for the previous request to be completed.`)
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
    employee_request.emailToUse = emailToUse
    employee_request.aveMonthlyBonus = averageBonus;
    employee_request.completed = completed;

    await employee_request.save();

    return {
      status: 201,
      message: "Successfully create employee request",
      employee_request,
    };
  }

  async findUserPurpose(finduserPurpose: FindUserPurposeDto) {
    const { employee_no, purpose } = finduserPurpose;
    try {
      const result = await EmployeeRequest.find({
        where: {
          employee_no,
        },
        relations: ["purposes"],
      });

      const isPurposeExists = getOnePurpose(result, purpose)

      return isPurposeExists;

    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAll(skip: string, take: string) {
    const result = await EmployeeRequest.findAndCount({
      skip: parseInt(take) * (parseInt(skip) - 1),
      take: parseInt(take),
      relations: ["purposes"],
    });

    const filterResult = filterAnswers(result[0]);

    return {
      status: 206,
      message: "Successfully fetched all employee requests",
      result: filterResult,
    };
  }

  async findAllNotCompleted() {
    const result = await EmployeeRequest.find({
      where: {
        completed: false,
      },
      relations: ["purposes"],
      take: 20,
    });

    const filterResult = filterAnswers(result);

    return {
      status: 200,
      message: "Successfully fetched all incomplete employee requests",
      result: filterResult,
      // result
    };
  }

  async findAllUserPurpose(employee_no: string) {
    const result = await EmployeeRequest.find({
      where: {
        employee_no,
      },
    });

    const filterResult = filterAnswers(result);

    return filterResult;
  }

  async findOne(id: string) {
    try {
      const result = await EmployeeRequest.findOne(id);

      return {
        status: 200,
        message: `Successfully fetched user ${id}`,
        result,
      };
    } catch (error: any) {
      throw new NotFoundException({
        status: 404,
        message: `Invalid ID. ${id} not found.`,
        serverMessage: error.message,
      });
    }
  }

  async update(id: string) {
    const employee_request: any = await this.findOne(id);

    (employee_request.result.completed = true),
      (employee_request.result.completedDateTime = dateCompleted());

    await employee_request?.result.save();

    return {
      status: 204,
      message: `Successfully update user ${id}`,
      result: employee_request.result,
    };
  }

  remove(id: string) {
    return EmployeeRequest.delete(id)
      .then((res) => res)
      .catch((err) => err);
  }
}
