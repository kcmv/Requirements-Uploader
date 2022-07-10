import { Module } from '@nestjs/common';
import { DocumentHistoryService } from './document-history.service';
import { DocumentHistoryController } from './document-history.controller';
import { CmsUsersModule } from 'src/cms-users/cms-users.module';

@Module({
  imports: [CmsUsersModule],
  controllers: [DocumentHistoryController],
  providers: [DocumentHistoryService]
})
export class DocumentHistoryModule {}
