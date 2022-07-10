import {
    applyDecorators,
  } from '@nestjs/common';
  import {
    ApiOperation,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { CreateDocumentDto, GetDocumentDto, GetDocumentsDto } from '../dto/create-document.dto';
  
  export const CreateDocument = () =>
    applyDecorators(
      ApiOperation({ summary: 'Create a document' }),
      ApiUnauthorizedResponse({
        description: "Unauthorized",
      }),
      ApiOkResponse({
        description: 'Responds with created document',
        type: [CreateDocumentDto],
      }),
    );

    export const GetAllDocuments = () =>
    applyDecorators(
      ApiOperation({ summary: 'Get all documents' }),
      ApiNotFoundResponse({
        description: 'Documents not found.',
      }),
      ApiUnauthorizedResponse({
        description: "Unauthorized",
      }),
      ApiOkResponse({
        description: 'Responds with all the documents',
        type: [GetDocumentsDto],
      }),
    );

    export const DeleteDocument = () =>
    applyDecorators(
      ApiOperation({ summary: 'Delete document by id' }),
      ApiNotFoundResponse({
        description: 'Document with id not found.',
      }),
      ApiUnauthorizedResponse({
        description: "Unauthorized",
      }),
      ApiOkResponse({
        description: 'Responds with affected details',
      }),
    );

    export const GetDocumentById = () =>
    applyDecorators(
      ApiOperation({ summary: 'Get document by id' }),
      ApiNotFoundResponse({
        description: 'Document with id not found.',
      }),
      ApiUnauthorizedResponse({
        description: "Unauthorized",
      }),
      ApiOkResponse({
        description: 'Responds with document details',
        type: [GetDocumentDto],
      }),
    );
  
  export const GetDocumentByType = () =>
    applyDecorators(
      ApiOperation({ summary: 'Get documents by tyoe' }),
      ApiNotFoundResponse({
        description: 'Documents not found.',
      }),
      ApiUnauthorizedResponse({
        description: "Unauthorized",
      }),
      ApiOkResponse({
        description: 'Responds with a single type of documents',
        type: [GetDocumentsDto],
      }),
    );
  