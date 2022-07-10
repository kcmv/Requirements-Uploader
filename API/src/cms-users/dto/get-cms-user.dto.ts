import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsIn, IsUUID } from "class-validator";
import { LoginType } from "./create-cms-user.dto";

export class GetUserDto {
    @ApiProperty()
    @IsUUID()
    id!: string;

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    employee_id!: string;

    @ApiProperty()
    @IsIn([LoginType.ADMIN, LoginType.GUEST])
    type!: string;
}

export class GetUsersDto {
    @ApiProperty({
        type: GetUserDto
    })
    @Type(() => GetUserDto)
    data!: GetUserDto[];

    @ApiProperty()
    count!: number;
}