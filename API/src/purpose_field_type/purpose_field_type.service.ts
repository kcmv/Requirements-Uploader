import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { FieldType } from "src/field_type/entities/field_type.entity";
import { CreatePurposeFieldTypeDto } from "./dto/create-purpose_field_type.dto";
import { UpdatePurposeFieldTypeDto } from "./dto/update-purpose_field_type.dto";
import { PurposeFieldType } from "./entities/purpose_field_type.entity";

@Injectable()
export class PurposeFieldTypeService {
  async create(createPurposeFieldTypeDto: CreatePurposeFieldTypeDto) {
    const { isNeeded, purpose_type_id } = createPurposeFieldTypeDto;

    try {
      const purpose_field_type: any = new PurposeFieldType();

      const findPurposeType = await FieldType.findOne(purpose_type_id);

      purpose_field_type.isNeeded = isNeeded;
      purpose_field_type.field_type = [findPurposeType];

      await purpose_field_type.save();

      return {
        status: 201,
        message: "Successfully create purpose field type",
        purpose_field_type
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const result = await PurposeFieldType.find({
      relations: ['field_type']
    });
    // relations: [''] we can omit this if eager is added on its entity model
    return {
      status: 200,
      message: "Successfully fetched all purpose field type",
      result
    }
  }

  async findOne(id: number) {
    const result = await PurposeFieldType.findOne(id);

    if (!result) {
      throw new NotFoundException(`Purpose field type id ${id} not found.`);
    }
    return {
      status: 200,
      message: `Successfully fetched purpose field type ${id}`,
      result
    };
  }

  update(id: number, _updatePurposeFieldTypeDto: UpdatePurposeFieldTypeDto) {
    return `This action updates a #${id} purposeFieldType`;
  }

  async remove(id: number) {
    const result = await PurposeFieldType.delete(id)

    return {
      status: 204,
      result
    }
  }
}
