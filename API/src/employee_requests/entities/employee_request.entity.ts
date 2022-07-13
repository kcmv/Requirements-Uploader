import { Answer } from "src/answers/entities/answer.entity";
import { Purpose } from "src/purpose/entities/purpose.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";

@Entity("employee_requests")
export class EmployeeRequest extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        default: ""
    })
    employee_no!: string;

    @Column()
    email!: string;

    @Column({ nullable: true })
    emailToUse!: string;

    @ManyToMany(() => Purpose, p => p.employee_requests, {
        eager: true
    })
    @JoinTable()
    purposes!: Purpose[];

    @ManyToMany(() => Answer, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinTable()
    answers!: Answer[];

    @Column({ default: 0 })
    aveMonthlyBonus!: number;

    @Column({ default: false })
    completed!: boolean;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    requestDateTime!: Date;

    @Column({ nullable: true })
    completedDateTime!: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

}
