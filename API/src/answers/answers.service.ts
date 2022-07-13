import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PurposeFieldTypeService } from 'src/purpose_field_type/purpose_field_type.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(PurposeFieldTypeService)
    private purposeFieldTypeService: PurposeFieldTypeService,
  ) {}

  /**
   * @description create answer
   * @param _createAnswerDto 
   * @returns 
   */
  async create(_createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = new Answer()

    const purpose_field_type = await this.purposeFieldTypeService.findOne(_createAnswerDto.purpose_field_type)

    answer.purpose_field_type = purpose_field_type.result
    answer.answer = _createAnswerDto.answer

    await answer.save()

    return answer
  }

  /**
   * @description get all answers
   * @param skip 
   * @param take 
   * @returns 
   */
  async findAll(skip: number, take: number): Promise<[Answer[],Number]> {
    const result = await Answer.findAndCount({
      skip: take * skip - 1,
      take: take
    });

    return result
  }

  /**
   * @description get one answer by id
   * @param id 
   * @returns 
   */
  async findOne(id: string): Promise<Answer> {
    const answer = await Answer.findOne(id)

    if (!answer) {
      throw new NotFoundException(`Answer id ${id} not found.`)
    }

    return answer
  }

  /**
   * @description update one by id
   * @param id 
   * @param _updateAnswerDto 
   * @returns 
   */
  async update(id: string, _updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.findOne(id)

    const purpose_field_type = await this.purposeFieldTypeService.findOne(_updateAnswerDto.purpose_field_type)

    answer.purpose_field_type = purpose_field_type.result
    answer.answer = _updateAnswerDto.answer

    await answer.save()

    return answer
  }

  /**
   * @description remove one by id
   * @param id 
   */
  async remove(id: string): Promise<void> {
    const answer = await Answer.delete(id)

    if (answer.affected === 0) {
      throw new NotFoundException(`Answer id ${id} not found.`)
    }
  }
}
