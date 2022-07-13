import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
