import { PurposeFieldType } from "src/purpose_field_type/entities/purpose_field_type.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('answers')
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => PurposeFieldType, pt => pt.answers, {
        eager: true
    })
    purpose_field_type!: PurposeFieldType

    @Column()
    answer!: string;
}
