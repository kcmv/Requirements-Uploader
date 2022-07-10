import { Module } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { DocumentsController } from "./documents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentsRepository } from "./documents.repository";
import { CmsUsersModule } from "src/cms-users/cms-users.module";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsRepository]), CmsUsersModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService]
})
export class DocumentsModule {}
