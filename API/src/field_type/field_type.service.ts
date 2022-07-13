import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFieldTypeDto } from "./dto/create-field_type.dto";
import { UpdateFieldTypeDto } from "./dto/update-field_type.dto";
import { FieldType } from "./entities/field_type.entity";

@Injectable()
export class FieldTypeService {
  /**
   * @description create field type
   * @param createFieldTypeDto
   * @returns
   */
  async create(createFieldTypeDto: CreateFieldTypeDto): Promise<FieldType> {
    const { name, description, answer_type } = createFieldTypeDto;
    const field_type = new FieldType();

    field_type.name = name;
    field_type.description = description;
    field_type.answer_type = answer_type;

    await field_type.save();

    return field_type;
  }

  /**
   * @description get all
   * @returns
   */
  async findAll(): Promise<FieldType[]> {
    const result = await FieldType.find();

    return result;
  }

  /**
   * @description find one by id
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<FieldType> {
    try {
      const result = await FieldType.findOne(id);

      if (!result) {
        throw new NotFoundException("not found");
      }

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * @description update field type by id
   * @param id
   * @param _updateFieldTypeDto
   * @returns
   */
  async update(id: number, _updateFieldTypeDto: UpdateFieldTypeDto) {
    const field_type = await this.findOne(id);

    field_type.name = _updateFieldTypeDto.name || "";
    field_type.description = _updateFieldTypeDto.description || "";
    field_type.answer_type = _updateFieldTypeDto.answer_type || "";

    await field_type.save();

    return field_type;
  }

  /**
   * @description remove field type by id
   * @param id 
   * @returns 
   */
  async remove(id: number): Promise<void> {
    const field = await FieldType.delete(id);

    if (field.affected === 0) {
      throw new NotFoundException(`Field type id ${id} not found.`)
    }
  }
}
