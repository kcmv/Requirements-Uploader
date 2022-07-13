import { PurposeFieldType } from "src/purpose_field_type/entities/purpose_field_type.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity("field_types")
export class FieldType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    answer_type!: string;

    @ManyToMany(() => PurposeFieldType, p => p.field_type)
    purpose_field_type!: PurposeFieldType[];
}
