import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";

export class CreatePurposeDto {
    @ApiProperty()
    @IsEmpty()
    name!: string;

    @ApiProperty()
    @IsEmpty()
    template_name!: string;

    @ApiProperty({ default: false })
    withCompensation!: boolean;

    @ApiProperty()
    @IsEmpty()
    purpose_field_type_arr!: number[];
}
