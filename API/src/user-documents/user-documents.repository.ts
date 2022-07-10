import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { isUUID } from "class-validator";
import { DocumentHistory } from "src/document-history/entities/document-history.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDocumentDto } from "./dto/create-user-document.dto";
import { UpdateUserDocumentDto } from "./dto/update-user-document.dto";
import { UserDocument } from "./entities/user-document.entity";

@EntityRepository(UserDocument)
export class UserDocumentRepository extends Repository<UserDocument> {
  /**
   * @description create a user document
   * @param createDocument
   * @returns Promise<UserDocument>
   */
  async createDocument(
    createDocument: CreateUserDocumentDto
  ): Promise<UserDocument> {
    const { user, document_type } = createDocument;

    const document = new UserDocument();
    document.active = false;
    document.document_type = document_type;
    document.user = user;
    await document.save();

    return document;
  }

  /**
   * @description get a user document by user document id
   * @param id
   * @returns Promise<UserDocument>
   */
  async getDocument(id: string): Promise<UserDocument> {
    const docs = await UserDocument.findOne({ id });

    if (!docs) {
      throw new NotFoundException(`User document with id ${id} not found.`);
    }

    return docs;
  }

  /**
   * @description get all user document by user id
   * @param id
   * @returns Promise<any>
   */
  async getUserDocuments(id: string): Promise<UserDocument[]> {
    if (!isUUID(id)) {
      throw new BadRequestException(
        `Invalid id, UUID format expected but received ${id}`
      );
    } else {
      const user = await UserDocument.find({ user: id });

      if (!user) {
        throw new NotFoundException(`User document with id ${id} not found`);
      }

      return user;
    }
  }

  /**
   * @description get user document by doc type and user id
   * @param user_id
   * @param doc_type
   * @returns
   */
  async getUserDocumentByUserIDAndUserDocType(
    user_id: string,
    doc_type: string
  ): Promise<UserDocument[]> {
    const doc = await UserDocument.find({
      where: {
        user: user_id,
        document_type: doc_type,
      },
    });

    return doc;
  }

  /**
   * @description update a user document by user document id
   * @param updateDocument
   * @returns
   */
  async udpateDocument(
    updateDocument: UpdateUserDocumentDto
  ): Promise<UserDocument> {
    const { id, document_link } = updateDocument;
    const user_documents = await this.getDocument(id);

    user_documents.document_link = document_link;
    user_documents.status = 2;
    user_documents.active = true;
    user_documents.date_submitted = new Date();
    user_documents.view_status = "NEW";
    await user_documents.save();

    const logs = new DocumentHistory();
    logs.active = user_documents.active;
    logs.status = user_documents.status;
    logs.document_link = user_documents.document_link;
    logs.date_submitted = user_documents.date_submitted;
    logs.history = user_documents;
    await logs.save();

    return user_documents;
  }

  /**
   * @descrption get all user documents
   * @param skip
   * @param take
   * @returns Promise<[UserDocument[], number]>
   */
  async getAllUserDocuments(
    skip: string,
    take: string
  ): Promise<[UserDocument[], number]> {
    const docs = await UserDocument.findAndCount({
      skip: parseInt(take) * (parseInt(skip) - 1),
      take: parseInt(take),
      relations: ["user"],
    });

    if (!docs) {
      throw new NotFoundException(`UserDocuments not found`);
    }

    return docs;
  }

  /**
   * @description delete user
   * @param id 
   */
  async deleteUserDocument(id: string): Promise<void> {
    const result = await UserDocument.delete(id);

    if (result.affected === 0) {
      throw new ConflictException(`User document with id ${id} not found`);
    }
  }
}
