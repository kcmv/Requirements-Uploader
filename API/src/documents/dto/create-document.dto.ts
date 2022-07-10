import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export enum DocType {
  NEW_HIRE = "day 1 critical requirements",
  GCT = "other requirements",
}

export class CreateDocumentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsIn([DocType.NEW_HIRE, DocType.GCT])
  type!: DocType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  field_id!: number;
}

export class GetDocumentDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  field_id!: number;

  @ApiProperty()
  @IsString()
  type!: string;

  @ApiProperty()
  @IsString()
  createdAt!: string;

  @ApiProperty()
  @IsString()
  updatedAt!: string;
}

export class GetDocumentsDto {
  @ApiProperty({
    type: GetDocumentDto,
  })
  @Type(() => GetDocumentDto)
  data!: GetDocumentDto[];

  @ApiProperty()
  count!: string;
}

export class GetDocumentsByTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn([DocType.NEW_HIRE, DocType.GCT])
  type!: string;
}