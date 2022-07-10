import { CmsUser } from "src/cms-users/entities/cms-user.entity";
import { Vaccine } from "src/vaccine/entities/vaccine.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("vaccination")
export class Vaccination extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  dose!: number;

  @Column()
  link!: string;

  @Column()
  dose_number!: string;

  @Column("datetime", { nullable: true })
  date_given!: Date;

  @Column({
    nullable: true,
  })
  view_status!: string;

  @Column({
    default: 5,
  })
  status!: number;

  @Column({
    nullable: true,
    length: "max",
  })
  comment!: string;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccination, {
    eager: true,
  })
  vaccine_type!: string;

  @ManyToOne(() => CmsUser, (cmsuser) => cmsuser.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  user!: string;

  @Column({ type: "datetime" })
  createdAt!: Date;
}
