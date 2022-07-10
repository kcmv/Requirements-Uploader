import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

export enum LoginType {
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
}

export class CreateCmsUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    employee_id!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn([LoginType.ADMIN, LoginType.GUEST])
    type!: string;
}

export class UserLoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password!: string;
}