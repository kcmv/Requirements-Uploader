import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CMSUserRepository } from "./cms-users.repository";
import { CreateCmsUserDto } from "./dto/create-cms-user.dto";
import { UpdateCmsUserDto } from "./dto/update-cms-user.dto";
import { CmsUser } from "./entities/cms-user.entity";
import { JwtService } from "@nestjs/jwt";
import { getProfile } from "src/services/onPremise";
import { UserDocumentRepository } from "src/user-documents/user-documents.repository";

@Injectable()
export class CmsUsersService {
  constructor(
    @InjectRepository(CMSUserRepository)
    @InjectRepository(UserDocumentRepository)
    private cmsuserRepository: CMSUserRepository,
    private jwtService: JwtService
  ) {}
  create(createCmsUserDto: CreateCmsUserDto): Promise<CmsUser> {
    return this.cmsuserRepository.createUser(createCmsUserDto);
  }

  findAll(skip: string, take: string) {
    return this.cmsuserRepository.getAll(skip, take);
  }

  findOne(email: string): Promise<CmsUser> {
    return this.cmsuserRepository.getOne(email);
  }

  getOneByUuid(id: string) {
    return this.cmsuserRepository.getOneByUuid(id);
  }

  async login(session_code: string): Promise<any> {
    const profile = await getProfile(session_code);

    const user = await this.cmsuserRepository.Login(
      profile.data.employee_no,
      profile.data.email
    );

    const payload = { user };
    const accessToken = await this.jwtService.sign(payload);

    return {
      user_id: user,
      accessToken,
      profile: {
        ...profile.data,
      },
    };
  }

  update(id: string, updateCmsUserDto: UpdateCmsUserDto) {
    return this.cmsuserRepository.updateUser(id, updateCmsUserDto);
  }

  async remove(id: string) {
    return this.cmsuserRepository.deleteEMP(id);
  }
}
