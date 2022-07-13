import { Module } from '@nestjs/common';
import { FieldTypeService } from './field_type.service';
import { FieldTypeController } from './field_type.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../employee_requests/jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" })
  ],
  controllers: [FieldTypeController],
  providers: [FieldTypeService,JwtStrategy]
})
export class FieldTypeModule {}
