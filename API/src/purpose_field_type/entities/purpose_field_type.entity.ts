import { FieldType } from "src/field_type/entities/field_type.entity";
import { Purpose } from "src/purpose/entities/purpose.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Answer } from "src/answers/entities/answer.entity";

@Entity("purpose_field_types")
export class PurposeFieldType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: false })
    isNeeded!: boolean;

    @ManyToMany(() => FieldType, ft => ft.purpose_field_type, {
        eager: true
    })
    @JoinTable()
    field_type!: FieldType[]

    @ManyToMany(() => Purpose, p => p.purpose_field_types)
    purposes!: Purpose[]

    @OneToMany(() => Answer, answer => answer.answer)
    answers!: Answer
}
