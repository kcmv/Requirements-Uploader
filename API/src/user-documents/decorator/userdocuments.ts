import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  CreateUserDocumentDto,
  UserDocumentResultDto,
} from "../dto/create-user-document.dto";
import { UpdateUserDocumentDto } from "../dto/update-user-document.dto";

export const CreateUuserDocument = () =>
  applyDecorators(
    ApiOperation({ summary: "Create user document" }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with all the user documents",
      type: [UserDocumentResultDto],
    })
  );

export const CreateUserDocument = () =>
  applyDecorators(
    ApiOperation({ summary: "Create user document" }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with created user document",
      type: [CreateUserDocumentDto],
    })
  );

export const GetAllUserDocumentById = () =>
  applyDecorators(
    ApiOperation({ summary: "Get all user documents by user id (UUID) " }),
    ApiNotFoundResponse({
      description: "user documents not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with all the user documents",
      type: [UserDocumentResultDto],
    })
  );

export const GetAllUserDocument = () =>
  applyDecorators(
    ApiOperation({ summary: "Get all user documents. Ex. skip: 1, take: 10" }),
    ApiNotFoundResponse({
      description: "User documents not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with all the user documents",
      type: [UserDocumentResultDto],
    })
  );

export const UpdateUserDocument = () =>
  applyDecorators(
    ApiOperation({ summary: "Update user document by id" }),
    ApiNotFoundResponse({
      description: "User document not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with the updated user document",
      type: [UpdateUserDocumentDto],
    })
  );


export const GetDocumentById = () =>
  applyDecorators(
    ApiOperation({ summary: "Get a single user document by id" }),
    ApiNotFoundResponse({
      description: "The user document not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with a single user document",
      type: UserDocumentResultDto,
    })
  );

  export const DeleteUserDocument = () =>
  applyDecorators(
    ApiOperation({ summary: "Delete user document" }),
    ApiNotFoundResponse({
      description: "User document id not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with affected rows"
    })
  );