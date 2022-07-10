import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CmsUsersService } from "src/cms-users/cms-users.service";
import { DocumentsService } from "src/documents/documents.service";
import { CreateUserDocumentDto } from "./dto/create-user-document.dto";
import { UpdateUserDocumentDto } from "./dto/update-user-document.dto";
import { UserDocument } from "./entities/user-document.entity";
import { UserDocumentRepository } from "./user-documents.repository";

@Injectable()
export class UserDocumentsService {
  constructor(
    @InjectRepository(UserDocumentRepository)
    @Inject(CmsUsersService)
    @Inject(DocumentsService)
    private userDocumentRepository: UserDocumentRepository,
    private cmsUserService: CmsUsersService,
    private documentService: DocumentsService
  ) {}
  async create(createUserDocument: CreateUserDocumentDto): Promise<UserDocument> {
    const { user, document_type } = createUserDocument;
    /* Check if user exists */
    await this.cmsUserService.getOneByUuid(user);

    /* Check if document type exists */
    await this.documentService.checkDocumentType(document_type);

    /* Check if user document already exists */
    const IsDocumentExists: any =
      await this.userDocumentRepository.getUserDocumentByUserIDAndUserDocType(
        user,
        document_type
      );

    if (IsDocumentExists.length > 0) {
      throw new ConflictException(
        `Document type ${IsDocumentExists[0].document_type["name"]} in user ${user} already exists`
      );
    }

    return this.userDocumentRepository.createDocument(createUserDocument);
  }

  findAll(skip: string, take: string): Promise<[UserDocument[], number]> {
    return this.userDocumentRepository.getAllUserDocuments(skip, take);
  }

  findOne(id: string): Promise<UserDocument> {
    return this.userDocumentRepository.getDocument(id);
  }

  getUserDocuments(id: string): Promise<UserDocument[]> {
    return this.userDocumentRepository.getUserDocuments(id);
  }

  update(updateDocument: UpdateUserDocumentDto): Promise<UserDocument> {
    return this.userDocumentRepository.udpateDocument(updateDocument);
  }

  remove(id: string): Promise<void> {
    return this.userDocumentRepository.deleteUserDocument(id);
  }
}
