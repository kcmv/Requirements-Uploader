import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

export enum DocStats {
  PENDING = 3,
  FOR_VALIDATION = 2,
  VALIDATED = 1,
  REJECTED = 4,
  NONE = 5,
  INVALID_DOCUMENT = 6,
}

export enum ActionReason {
  DUPLICATE = "DUPLICATE UPLOAD",
  INCORRECT = "INCORRECT UPLOAD",
  INVALID_DOCUMENT = "INVALID DOCUMENT",
  NO_RELEASE_DATE = "NO RELEASE DATE",
  UNCLEAR_DOCUMENT = "UNCLEAR DOCUMENT",
  NONE = "NONE",
}


export class UpdateUserDocumentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  document_link!: string;
}
