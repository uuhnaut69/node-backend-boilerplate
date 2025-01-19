import "reflect-metadata";

import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { encrypt } from "@/common/utils/encryption";
import UserEntity from "@/modules/users/models/user.entity";

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    await dataSource.getRepository(UserEntity).insert({
      username: "user1",
      password: await encrypt("password1"),
    });
  }
}
