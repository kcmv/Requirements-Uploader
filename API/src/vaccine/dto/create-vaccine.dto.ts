import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVaccineDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  field_id!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isbooster!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dose_name!: string;

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  required_dosage!: number;
}
