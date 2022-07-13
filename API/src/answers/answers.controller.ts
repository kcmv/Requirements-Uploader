import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswersService } from "./answers.service";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { UpdateAnswerDto } from "./dto/update-answer.dto";
import { Answer } from "./entities/answer.entity";

@ApiTags("Answers")
@Controller("answers")
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get(":skip/:take")
  @UsePipes(ValidationPipe)
  findAll(
    @Param("skip", ParseIntPipe) skip: number,
    @Param("take", ParseIntPipe) take: number
  ): Promise<[Answer[], Number]> {
    return this.answersService.findAll(skip, take);
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(ValidationPipe)
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.answersService.remove(id);
  }
}
