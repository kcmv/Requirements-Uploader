import { BadRequestException, NotFoundException } from "@nestjs/common";
import { isUUID } from "class-validator";
import { EntityRepository, Repository } from "typeorm";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Document } from "./entities/document.entity";

@EntityRepository(Document)
export class DocumentsRepository extends Repository<Document> {
  /**
   * @description create a document
   * @param documentDto
   * @returns Promise<Document>
   */
  async createDocument(documentDto: CreateDocumentDto): Promise<Document> {
    const { name, type, field_id } = documentDto;
    const document = new Document();
    document.name = name;
    document.type = type;
    document.field_id = field_id;

    await document.save();

    return document;
  }

  /**
   * @description gets all document types
   * @returns Promise<[Document[], number]
   */
  async getDocuments(): Promise<[Document[], number]> {
    const docs = await Document.findAndCount();

    if (!docs) {
      throw new NotFoundException(`Documents not found`);
    }

    return docs;
  }

  /**
   * @description find a document by id
   * @param id
   * @returns Promise<Document>
   */
  async getDocumentById(id: string): Promise<Document> {
    if (!isUUID(id))
      throw new BadRequestException(
        `Invalid id, UUID format expected but received ${id}`
      );

    const docs = await Document.findOne(id);

    if (!docs) {
      throw new NotFoundException(`Document id ${id} not found`);
    }

    return docs;
  }

  async getDocumentTypeById(id: string) {
    const document = await Document.findOne(id);

    if (!document) {
      throw new NotFoundException(`Document id ${id} not found.`);
    }

    return document;
  }

  /**
   * @description update document
   * @param id
   * @param updateDocumentDto
   * @returns
   */
  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.getDocumentById(id);

    document.name = updateDocumentDto.name!;
    document.type = updateDocumentDto.type!;
    document.field_id = updateDocumentDto.field_id!;

    await document.save();

    return document;
  }

  /**
   * @description get all documents by type
   * @param type
   * @returns Promise<[Document[], number]>
   */
  async getDocumentsByType(type: string): Promise<[Document[], number]> {
    const docs = await Document.findAndCount({
      type,
    });

    if (!docs) {
      throw new NotFoundException(`Documents with type ${type} not found`);
    }

    return docs;
  }

  /**
   * @description delete document
   * @param id
   * @returns
   */
  async removeDocument(id: string) {
    await this.getDocumentById(id);

    const result = await Document.delete(id);

    return result;
  }
}
