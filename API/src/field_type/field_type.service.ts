import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateFieldTypeDto,
} from "./dto/create-field_type.dto";
import { UpdateFieldTypeDto } from "./dto/update-field_type.dto";
import { FieldType } from "./entities/field_type.entity";

@Injectable()
export class FieldTypeService {
  async create(createFieldTypeDto: CreateFieldTypeDto) {
    const { name, description, answer_type } = createFieldTypeDto;
    const field_type = new FieldType();

    field_type.name = name;
    field_type.description = description;
    field_type.answer_type = answer_type;

    await field_type.save();

    return {
      status: 201,
      message: "Successfully created field type",
      field_type,
    };
  }

  async findAll() {
    const result = await FieldType.find();

    return {
      status: 200,
      message: "Successfully fetched all field types",
      result,
    };
  }

  async findOne(id: number) {
    try {
      const result = await FieldType.findOne(id);

      if (!result) {
        throw new NotFoundException("not found");
      }

      return {
        status: 200,
        message: `Successfully fetched field type id ${id}`,
        result,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  update(id: number, _updateFieldTypeDto: UpdateFieldTypeDto) {
    return `This action updates a #${id} fieldType`;
  }

  async remove(id: string) {
    const field = await FieldType.delete(id);

    return {
      status: 204,
      field,
    };
  }
}
