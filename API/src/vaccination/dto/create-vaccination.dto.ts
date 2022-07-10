import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateVaccinationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dose!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dose_number!: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date_given!: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  vaccine_type!: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;
}
