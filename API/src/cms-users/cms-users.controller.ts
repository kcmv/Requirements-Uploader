import { ParseUUIDPipe, UseGuards } from "@nestjs/common";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RouteGuard } from "src/guards/auth.guard";
import { onPremiseLogin } from "src/services/onPremise";
import { CmsUsersService } from "./cms-users.service";
import { CreateUsers, DeleteUserById, GetAllUsers, GetUserByEmail, UpdateUser, UserLogin } from "./decorator/cms-users.decorator";
import { CreateCmsUserDto, UserLoginDto } from "./dto/create-cms-user.dto";
import { UpdateCmsUserDto } from "./dto/update-cms-user.dto";
import { CmsUser } from "./entities/cms-user.entity";

@Controller("cms-users")
@ApiTags("Users")
export class CmsUsersController {
  constructor(private readonly cmsUsersService: CmsUsersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @CreateUsers()
  @UsePipes(ValidationPipe)
  create(@Body() createCmsUserDto: CreateCmsUserDto): Promise<CmsUser> {
    return this.cmsUsersService.create(createCmsUserDto);
  }

  @Get(":skip/:take")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @GetAllUsers()
  findAll(@Param("skip") skip: string, @Param("take") take: string) {
    return this.cmsUsersService.findAll(skip,take);
  }

  @Get(":email")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @GetUserByEmail()
  findOne(@Param("email") email: string) {
    return this.cmsUsersService.findOne(email);
  }

  @Post("login")
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(RouteGuard)
  @UserLogin()
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;
    try {
      const response: any = await onPremiseLogin({ email, password });

      if (response.status === 401) {
        throw new UnauthorizedException(
          `${response.title} ${response.message}`
        );
      } else {
        const { token } = response.profile.data;
        return this.cmsUsersService.login(token);
      }
    } catch (error: any) {
        throw new Error(error);
    }
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UpdateUser()
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updateCmsUserDto: UpdateCmsUserDto) {
    return this.cmsUsersService.update(id, updateCmsUserDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @DeleteUserById()
  remove(@Param("id") id: string) {
    return this.cmsUsersService.remove(id);
  }
}
