import { Column, Entity } from "typeorm";

import BaseEntity from "@/common/models/base.entity";

@Entity({ name: "users" })
export default class UserEntity extends BaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  public username: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  public password: string;
}
