import { NotFoundException } from "@nestjs/common";
import { Document } from "src/documents/entities/document.entity";
import { deleteBlob } from "src/services/azureblob";
import { UserDocument } from "src/user-documents/entities/user-document.entity";
import { Vaccination } from "src/vaccination/entities/vaccination.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateCmsUserDto } from "./dto/create-cms-user.dto";
import { UpdateCmsUserDto } from "./dto/update-cms-user.dto";
import { CmsUser } from "./entities/cms-user.entity";

@EntityRepository(CmsUser)
export class CMSUserRepository extends Repository<CmsUser> {
  /**
   * @description Create a user
   * @param createUser
   * @dto CreateCmsUserDto
   * @returns Promise<CmsUser>
   */
  async createUser(createUser: CreateCmsUserDto): Promise<CmsUser> {
    const { email, employee_id, type } = createUser;

    const user = new CmsUser();
    user.email = email;
    user.employee_id = employee_id;
    user.type = type;

    await user.save();

    const first_req = await Document.findAndCount();

    first_req[0].map(async (item) => {
      const user_docs = new UserDocument();
      user_docs.active = false;
      user_docs.document_type = item.id;
      user_docs.user = user.id;
      await user_docs.save();
      return user_docs;
    });

    return user;
  }

  /**
   * @description update user by id
   * @param id
   * @param updateCmsUserDto
   * @returns
   */
  async updateUser(
    id: string,
    updateCmsUserDto: UpdateCmsUserDto
  ): Promise<CmsUser> {
    const user = await this.getOneByUuid(id);

    const { email, employee_id, type } = updateCmsUserDto;

    user.email = email!;
    user.employee_id = employee_id!;
    user.type = type!;

    user.save();

    return user;
  }

  /**
   * @description get user by uuid
   * @param id
   * @returns
   */
  async getOneByUuid(id: string): Promise<CmsUser> {
    const user = await CmsUser.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return user;
  }

  /**
   *
   * @description finds one user
   * @param employee_id
   * @dto none
   * @returns Promise<CmsUser
   */
  async getOne(employee_id: string): Promise<CmsUser> {
    const user = await CmsUser.findOne({
      where: [{ employee_id: employee_id }],
    });

    if (!user) {
      throw new NotFoundException(`Email ${employee_id} not found.`);
    }

    return user;
  }

  /**
   *
   * @param skip
   * @param take
   * @returns
   */
  async getAll(skip: string, take: string): Promise<[CmsUser[], number]> {
    const users = await CmsUser.findAndCount({
      skip: parseInt(take) * (parseInt(skip) - 1),
      take: parseInt(take),
    });

    if (!users) {
      throw new NotFoundException(`Users not found`);
    }

    return users;
  }

  /**
   * @description delete user based on employee id or email
   * @param employee_id (can be email)
   * @todo ondelete cascade not working with user_documents, had to
   * do delete query execution manually. Maybe status history relation
   * conflicts the execution
   * @return void
   */
  async deleteEMP(employee_id: string): Promise<void> {
    const user = await this.getOne(employee_id);

    // Get all user documents link to be deleted
    const docs = await UserDocument.find({
      where: {
        user: user.id,
      },
    });

    // map and delete links on azure
    docs.map(async (item) => {
      if (item.document_link) {
        await deleteBlob(item.document_link);
      }
    });

    // Get all user vaccination link to be deleted
    const vaccinations = await Vaccination.find({
      where: {
        user: user.id,
      },
    });

    // map and delete links on azure
    vaccinations.map(async (item) => {
      if (item.link) {
        await deleteBlob(item.link);
      }
    });

    // execute delete func for cms user
    const result = await CmsUser.delete({ id: user.id });

    const user_documents = await UserDocument.createQueryBuilder()
      .delete()
      .where("userId = :id", { id: user.id })
      .execute();

    if (result.affected === 0 && user_documents.affected === 0) {
      throw new NotFoundException(`Document with ID ${employee_id} not found`);
    }
  }

  /**
   *
   * @description user login
   * @param employee_id
   * @param email
   * @returns token, profile(User)
   */
  async Login(employee_id: string, email: string): Promise<any> {
    const user_email = await CmsUser.findOne({
      where: [{ employee_id: employee_id }, { employee_id: email }],
    });

    if (user_email) {
      return user_email.id;
    } else {
      const cmsuser = new CmsUser();
      cmsuser.employee_id = employee_id;
      cmsuser.email = email;
      cmsuser.type = "GUEST";

      await cmsuser.save();

      const first_req = await Document.findAndCount();

      // Create user document types
      first_req[0].map(async (item) => {
        const user_docs = new UserDocument();
        user_docs.active = false;
        user_docs.document_type = item.id;
        user_docs.user = cmsuser.id;
        await user_docs.save();
        return user_docs;
      });

      return cmsuser.id;
    }
  }
}
