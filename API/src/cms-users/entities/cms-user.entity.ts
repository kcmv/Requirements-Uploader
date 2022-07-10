import { UserDocument } from "src/user-documents/entities/user-document.entity";
import { Vaccination } from "src/vaccination/entities/vaccination.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cms_users")
export class CmsUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  employee_id!: string;

  @Column()
  type!: string;

  @OneToMany(() => UserDocument, (doc) => doc.id)
  documents!: UserDocument[];

  @OneToMany(() => Vaccination, (vaccination) => vaccination.id)
  vaccination!: Vaccination[];
}
