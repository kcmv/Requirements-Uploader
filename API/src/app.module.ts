import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CmsUsersModule } from "./cms-users/cms-users.module";
import { DocumentsModule } from "./documents/documents.module";
import { UserDocumentsModule } from "./user-documents/user-documents.module";
import { DocumentHistoryModule } from "./document-history/document-history.module";
import { VaccineModule } from "./vaccine/vaccine.module";
import ConnectionOptions from "./config/typeorm.config";
import { VaccinationModule } from "./vaccination/vaccination.module";
import { FieldTypeModule } from "./field_type/field_type.module";
import { PurposeFieldTypeModule } from "./purpose_field_type/purpose_field_type.module";
import { PurposeModule } from "./purpose/purpose.module";
import { EmployeeRequestsModule } from "./employee_requests/employee_requests.module";
import { AnswersModule } from "./answers/answers.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === "development" ? false : true,
    }),
    TypeOrmModule.forRoot(ConnectionOptions),
    CmsUsersModule,
    DocumentsModule,
    UserDocumentsModule,
    DocumentHistoryModule,
    VaccinationModule,
    VaccineModule,
    FieldTypeModule,
    PurposeFieldTypeModule,
    PurposeModule,
    EmployeeRequestsModule,
    AnswersModule,
  ],
})
export class AppModule {}
