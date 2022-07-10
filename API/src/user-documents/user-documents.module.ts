import { Module } from "@nestjs/common";
import { UserDocumentsService } from "./user-documents.service";
import { UserDocumentsController } from "./user-documents.controller";
import { UserDocumentRepository } from "./user-documents.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsModule } from "src/documents/documents.module";
import { CmsUsersModule } from "src/cms-users/cms-users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDocumentRepository]),
    CmsUsersModule,
    DocumentsModule,
  ],
  controllers: [UserDocumentsController],
  providers: [UserDocumentsService],
})
export class UserDocumentsModule {}
