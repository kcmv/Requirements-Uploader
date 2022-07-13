import { ApiProperty } from "@nestjs/swagger";

export class CreatePurposeFieldTypeDto {
    @ApiProperty()
    isNeeded!: boolean;

    @ApiProperty()
    purpose_type_id!: number
}
