import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm";
import { DocumentsRepository } from "./documents.repository";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Document } from "./entities/document.entity";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentsRepository)
    private docsRepository: DocumentsRepository
  ) {}
  create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.docsRepository.createDocument(createDocumentDto);
  }

  findAll(): Promise<[Document[], number]> {
    return this.docsRepository.getDocuments();
  }

  findOne(type: string): Promise<[Document[], number]> {
    return this.docsRepository.getDocumentsByType(type);
  }

  checkDocumentType(id: string): Promise<Document>{
    return this.docsRepository.getDocumentTypeById(id)
  }

  findById(id: string): Promise<Document> {
    return this.docsRepository.getDocumentById(id)
  }

  update(id: string, _updateDocumentDto: UpdateDocumentDto) {
    return this.docsRepository.updateDocument(id,_updateDocumentDto)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.docsRepository.removeDocument(id)
  }
}
