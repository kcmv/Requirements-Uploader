import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateFieldTypeDto {
   
    @ApiProperty()
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    description!: string;

    @ApiProperty()
    @IsNotEmpty()
    answer_type!: string;
}