import { Injectable, NotFoundException } from "@nestjs/common";
import { PurposeFieldType } from "src/purpose_field_type/entities/purpose_field_type.entity";
import { CreatePurposeDto } from "./dto/create-purpose.dto";
import { UpdatePurposeDto } from "./dto/update-purpose.dto";
import { Purpose } from "./entities/purpose.entity";

@Injectable()
export class PurposeService {
  async create(createPurposeDto: CreatePurposeDto) {
    const { name, template_name, purpose_field_type_arr, withCompensation } = createPurposeDto;

    let ids = []

    for (let ft of purpose_field_type_arr) {
      let field_type = await this.findOnePurposeFieldType(ft)
       ids.push(field_type["purpose_field_type"])
    }

    const purpose = new Purpose()

    purpose.name = name
    purpose.template_name = template_name
    purpose.withCompensation = withCompensation
    purpose.purpose_field_types = ids

    await purpose.save()

    return {
      status: 201,
      message: "Successfully created purpose",
      purpose
    }
  }

  async findAll() {
    const purposes = await Purpose.find();

    return {
      status: 200,
      message: "Successfully fetched all purpose",
      purposes
    };
  }

  async findOnePurposeFieldType(id: number) {
    const purpose_field_type = await PurposeFieldType.findOne(id);

    if (!purpose_field_type) {
      throw new NotFoundException(`Purpose id ${id} not found.`)
    }

    return {
      // status: 200,
      // message: `Successfully fetched purpose ${id}`,
      purpose_field_type
    }
  }

  async findOne(id: number) {
    const purpose = await Purpose.findOne(id);

    if (!purpose) {
      throw new NotFoundException(`Purpose id ${id} not found.`)
    }

    return {
      // status: 200,
      // message: `Successfully fetched purpose ${id}`,
      purpose
    }
  }

  update(id: number, _updatePurposeDto: UpdatePurposeDto) {
    return `This action updates a #${id} purpose`;
  }

  async remove(id: string) {
   const result = await Purpose.delete(id)

   return {
     status: 204,
     result
   }
  }
}
