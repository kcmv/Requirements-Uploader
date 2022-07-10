import { CmsUser } from "src/cms-users/entities/cms-user.entity";
import { DocumentHistory } from "src/document-history/entities/document-history.entity";
import { Document } from "src/documents/entities/document.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("user_documents")
export class UserDocument extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => CmsUser, (cmsuser) => cmsuser.id, {
    onDelete: "CASCADE",
    eager: true,
  })
  user!: string;

  @ManyToOne(() => Document, (doc) => doc.id, {
    eager: true,
  })
  document_type!: string;

  @OneToMany(() => DocumentHistory, (history) => history.history, {
    eager: true,
    onDelete: "CASCADE",
  })
  status_history!: DocumentHistory[];

  @Column()
  active!: boolean;

  @Column({
    nullable: true,
  })
  view_status!: string;

  @Column({
    nullable: true,
  })
  document_link!: string;

  @Column("datetime", { nullable: true })
  date_submitted!: Date;

  @Column({
    default: 5,
  })
  status!: number;

  @Column({
    nullable: true,
    length: "max",
  })
  comments!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
