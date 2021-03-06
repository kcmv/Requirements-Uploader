import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Query,
} from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import {
  CreateDocumentDto,
  GetDocumentsByTypeDto,
} from "./dto/create-document.dto";
import { Document } from "./entities/document.entity";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DocumentInterceptor } from "./interceptor/document.interceptor";
import {
  CreateDocument,
  DeleteDocument,
  GetAllDocuments,
  GetDocumentById,
  GetDocumentByType,
} from "./decorator/documents.decorator";
import { DeleteResult } from "typeorm";

@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags("Documents")
@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(DocumentInterceptor)
  @UsePipes(ValidationPipe)
  @CreateDocument()
  create(@Body() createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  @GetAllDocuments()
  findAll(): Promise<[Document[], number]> {
    return this.documentsService.findAll();
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  @GetDocumentById()
  findById(@Param("id") id: string): Promise<Document> {
    return this.documentsService.findById(id);
  }

  @Get(":type")
  @UsePipes(ValidationPipe)
  @GetDocumentByType()
  findOne(@Query() type: GetDocumentsByTypeDto): Promise<[Document[], number]> {
    return this.documentsService.findOne(type.type);
  }

  @Patch(":id")
  @GetDocumentById()
  @UsePipes(ValidationPipe)
  update(
    @Param("id") id: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ): Promise<Document> {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  @DeleteDocument()
  remove(@Param("id") id: string): Promise<DeleteResult> {
    return this.documentsService.remove(id);
  }
}
