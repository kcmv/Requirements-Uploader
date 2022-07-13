import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateAnswerDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    purpose_field_type!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    answer!: string
}
