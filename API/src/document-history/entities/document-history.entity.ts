import { UserDocument } from "src/user-documents/entities/user-document.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('document_history')
export class DocumentHistory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        nullable: true
    })
    active!: boolean;

    @Column()
    status!: number;

    @Column('datetime', { nullable: true })
    date_submitted!: Date;

    @Column({
        nullable: true
    })
    document_link!: string;

    @Column({
        nullable: true,
        length: 'max'
    })
    comments!: string;

    @ManyToOne(() => UserDocument, udoc => udoc.id, {
        onDelete: 'CASCADE'
    })
    history!: UserDocument;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}
