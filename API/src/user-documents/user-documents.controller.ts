import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { UserDocumentsService } from "./user-documents.service";
import { CreateUserDocumentDto } from "./dto/create-user-document.dto";
import { UpdateUserDocumentDto } from "./dto/update-user-document.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserDocument } from "./entities/user-document.entity";
import { AuthGuard } from "@nestjs/passport";
import {
  CreateUserDocument,
  DeleteUserDocument,
  GetAllUserDocument,
  GetAllUserDocumentById,
  GetDocumentById,
  UpdateUserDocument,
} from "./decorator/userdocuments";

@ApiBearerAuth()
@Controller("user-documents")
@ApiTags("User Documents")
export class UserDocumentsController {
  constructor(private readonly userDocumentsService: UserDocumentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @CreateUserDocument()
  async createUserDocument(
    @Body() createUserDocumentDto: CreateUserDocumentDto
  ): Promise<UserDocument> {
    return this.userDocumentsService.create(createUserDocumentDto);
  }

  @Get("/user/:id")
  @UseGuards(AuthGuard())
  @GetAllUserDocumentById()
  getUserDocuments(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<UserDocument[]> {
    return this.userDocumentsService.getUserDocuments(id);
  }

  @Get(":skip/:take")
  @UseGuards(AuthGuard())
  @GetAllUserDocument()
  findAll(
    @Param("skip") skip: string,
    @Param("take") take: string
  ): Promise<[UserDocument[], number]> {
    return this.userDocumentsService.findAll(skip, take);
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  @GetDocumentById()
  findOne(@Param("id", ParseUUIDPipe) id: string): Promise<UserDocument> {
    return this.userDocumentsService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @UpdateUserDocument()
  updateDocument(
    @Body() updateUserDocumentDto: UpdateUserDocumentDto
  ): Promise<UserDocument> {
    return this.userDocumentsService.update(updateUserDocumentDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  @DeleteUserDocument()
  remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.userDocumentsService.remove(id);
  }
}
