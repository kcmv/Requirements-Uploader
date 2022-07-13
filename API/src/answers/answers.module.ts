import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PurposeFieldTypeModule } from 'src/purpose_field_type/purpose_field_type.module';

@Module({
  imports: [PurposeFieldTypeModule],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
