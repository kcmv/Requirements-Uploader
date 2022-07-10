import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetUserDocumentDto {
    @ApiProperty()
    @IsUUID()
    id!: string;

    @ApiProperty()
    active!: boolean;

    @ApiProperty()
    view_status!: string;

    @ApiProperty()
    document_link?: string;

    @ApiProperty()
    date_submitted?: string

    @ApiProperty()
    status!: number;

    @ApiProperty()
    comments?: string;

    @ApiProperty()
    createdAt!: string;

    @ApiProperty()
    updatedAt!: string;
}
