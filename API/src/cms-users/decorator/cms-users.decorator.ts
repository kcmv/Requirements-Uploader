import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CreateCmsUserDto } from "../dto/create-cms-user.dto";
import { GetUserDto, GetUsersDto } from "../dto/get-cms-user.dto";

export const CreateUsers = () =>
  applyDecorators(
    ApiOperation({ summary: "Create a user" }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with created user",
      type: [CreateCmsUserDto],
    })
  );

export const GetAllUsers = () =>
  applyDecorators(
    ApiOperation({ summary: "Get all users: Ex. Skip: 1, take: 5" }),
    ApiNotFoundResponse({
      description: "User documents not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with all the user documents",
      type: [GetUsersDto],
    })
  );

export const GetUserByEmail = () =>
  applyDecorators(
    ApiOperation({ summary: "Get user by email or employee id" }),
    ApiNotFoundResponse({
      description: "User not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with user details",
      type: [GetUserDto],
    })
  );

export const UserLogin = () =>
  applyDecorators(
    ApiOperation({ summary: "User login" }),
    ApiNotFoundResponse({
      description: "User not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Invalid username or password",
    }),
    ApiOkResponse({
      description: "Responds with user details",
      type: [GetUserDto],
    })
  );

export const UpdateUser = () =>
  applyDecorators(
    ApiOperation({ summary: "Update user by id" }),
    ApiNotFoundResponse({
      description: "User with id not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with the updated user",
      type: [GetUserDto],
    })
  );

export const DeleteUserById = () =>
  applyDecorators(
    ApiOperation({ summary: "Delete user by employee id" }),
    ApiNotFoundResponse({
      description: "User with id not found.",
    }),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
    }),
    ApiOkResponse({
      description: "Responds with number of affected",
    })
  );
