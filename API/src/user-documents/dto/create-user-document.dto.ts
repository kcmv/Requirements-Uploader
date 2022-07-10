import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";
import { ActionReason } from "./update-user-document.dto";

export class CreateUserDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  document_type!: string;
}

export class GetUserDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id!: string;
}

export class DocumentType {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  type!: string;

  @ApiProperty()
  @IsString()
  createdAt!: string;

  @ApiProperty()
  @IsString()
  updatedAt!: string;

  @ApiProperty({
    default: [],
  })
  @IsString()
  faq_images!: [string];
}

export class UserExampleDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsString()
  employee_id!: string;

  @ApiProperty()
  @IsString()
  type!: string;
}

export class UserDocumentResultDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsBoolean()
  active!: boolean;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn([
    ActionReason.NONE,
    ActionReason.DUPLICATE,
    ActionReason.INCORRECT,
    ActionReason.INVALID_DOCUMENT,
    ActionReason.NO_RELEASE_DATE,
  ])
  comments!: string;

  @ApiProperty()
  @IsString()
  document_link!: string | null;

  @ApiProperty()
  @IsDateString()
  date_submitted!: string | null;

  @ApiProperty()
  @IsNumber()
  status!: number;

  @ApiProperty()
  @IsDateString()
  createdAt!: string;

  @ApiProperty()
  @IsDateString()
  updatedAt!: string;

  @ApiProperty()
  user!: UserExampleDto;

  @ApiProperty()
  document_type!: DocumentType;

  @ApiProperty({
    default: [],
  })
  @IsString()
  status_history!: [string];
}
