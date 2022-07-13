import { EmployeeRequest } from "src/employee_requests/entities/employee_request.entity";
import { PurposeFieldType } from "src/purpose_field_type/entities/purpose_field_type.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("purposes")
export class Purpose extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  template_name!: string;

  @ManyToMany(() => PurposeFieldType, pft => pft.purposes, {
    eager: true
  })
  @JoinTable()
  purpose_field_types!: PurposeFieldType[];

  @ManyToMany(() => EmployeeRequest, p => p.purposes)
  employee_requests!: EmployeeRequest[];

  @Column({ default: 0 })
  withCompensation!: boolean;
}
