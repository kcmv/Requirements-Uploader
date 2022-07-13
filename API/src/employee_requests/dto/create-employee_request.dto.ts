import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { Type } from 'class-transformer';

export class AnswerFormatDto {
    @ApiProperty({
        default: ''
    })
    @IsNotEmpty()
    purpose_field_type!: number;

    @ApiProperty({
        default: ''
    })
    answer!: string;
}

export class CreateEmployeeRequestDto {
    @ApiProperty({
        default: ''
    })
    @IsNotEmpty()
    @IsString()
    employee_no!: string;

    @ApiProperty({
        default: ''
    })
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @ApiProperty({
        default: ''
    })
    @IsNotEmpty()
    @IsString()
    emailToUse!: string;

    @ApiProperty({
        default: ''
    })
    @IsOptional()
    @IsString()
    password!: string;

    @ApiProperty({
        default: ''
    })
    @IsNotEmpty()
    @IsBoolean()
    withCompensation!: false;

    @ApiProperty({
        default: ''
    })
    @IsNotEmpty()
    @IsNumber()
    purpose_id!: number;

    @ApiProperty({
        type: [AnswerFormatDto]
    })
    @ValidateNested({ each: true })
    @Type(() => AnswerFormatDto)
    answers!: AnswerFormatDto[];

    @ApiProperty({
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    completed!: boolean;

    @ApiProperty({
        type: 'Date',
        default: null
    })
    completedDateTime!: Date;
}

export class FindUserPurposeDto {
    @ApiProperty()
    @IsNotEmpty()
    employee_no!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    purpose!: number;
}
