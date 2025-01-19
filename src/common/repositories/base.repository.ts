import { EntityTarget, Repository } from "typeorm";

import datasource from "@/common/configs/database/datasource";
import BaseEntity from "@/common/models/base.entity";

export default abstract class BaseRepository<E extends BaseEntity> {
  protected readonly repository: Repository<E>;

  constructor(protected readonly entity: EntityTarget<E>) {
    this.repository = datasource.getRepository(entity);
  }
}
