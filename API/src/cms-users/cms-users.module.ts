import { HttpModule, Module } from "@nestjs/common";
import { CmsUsersService } from "./cms-users.service";
import { CmsUsersController } from "./cms-users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CMSUserRepository } from "./cms-users.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { UserDocumentRepository } from "src/user-documents/user-documents.repository";

@Module({
  imports: [
    // use CmsUsersModule in other module imports to use JWT Guard
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    HttpModule,
    TypeOrmModule.forFeature([CMSUserRepository, UserDocumentRepository]),
  ],
  controllers: [CmsUsersController],
  providers: [CmsUsersService, JwtStrategy],
  exports: [
    // exported to be use in other modules
    JwtStrategy,
    PassportModule,
    CmsUsersService,
  ],
})
export class CmsUsersModule {}
