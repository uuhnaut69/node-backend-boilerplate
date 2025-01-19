import { injectable } from "tsyringe";

import BaseRepository from "@/common/repositories/base.repository";
import UserEntity from "@/modules/users/models/user.entity";

@injectable()
export default class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }
  
  public async findByUsername(username: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { username } });
  }

  public async existsByUsername(username: string): Promise<boolean> {
    return this.repository.exists({ where: { username } });
  }

  public async createUser(data: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    return this.repository.save(data);
  }
}
