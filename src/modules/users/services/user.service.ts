import { injectable } from "tsyringe";

import { IsolationLevel, Transactional } from "typeorm-transactional";

import { ConflictError } from "@/common/errors";
import { encrypt } from "@/common/utils/encryption";
import UserEntity from "@/modules/users/models/user.entity";
import UserRepository from "@/modules/users/repositories/user.repository";

@injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findByUsername(username);
  }

  @Transactional({ isolationLevel: IsolationLevel.READ_COMMITTED })
  public async createUser(data: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const { username, password } = data;

    const isAlreadyExists =
      await this.userRepository.existsByUsername(username);

    if (isAlreadyExists) {
      throw new ConflictError("User already exists");
    }

    const user = new UserEntity();
    user.username = username;
    user.password = await encrypt(password);
    await this.userRepository.createUser(user);
    delete user.password;
    return user;
  }
}
