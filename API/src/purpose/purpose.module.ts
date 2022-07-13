import { Module } from '@nestjs/common';
import { PurposeService } from './purpose.service';
import { PurposeController } from './purpose.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/employee_requests/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" })
  ],
  controllers: [PurposeController],
  providers: [PurposeService,JwtStrategy]
})
export class PurposeModule {}
