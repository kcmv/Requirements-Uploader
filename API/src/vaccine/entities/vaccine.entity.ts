import { Vaccination } from "src/vaccination/entities/vaccination.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Vaccine extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  field_id!: number;

  @Column()
  dose_name!: string;

  @Column({
    default: false,
  })
  isbooster!: boolean;

  @Column({
    default: 1,
  })
  required_dosage!: number;

  @OneToMany(() => Vaccination, (vaccination) => vaccination.vaccine_type, {
    onDelete: "CASCADE",
  })
  vaccination!: Vaccination[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
