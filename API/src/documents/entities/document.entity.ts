import { UserDocument } from "src/user-documents/entities/user-document.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("documents")
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  field_id!: number;

  @Column()
  type!: string;

  @OneToMany(() => UserDocument, (doc) => doc.document_type, {
    cascade: true,
    onDelete: "CASCADE",
  })
  doc_type!: UserDocument[];

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
