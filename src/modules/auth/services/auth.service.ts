import { injectable } from "tsyringe";

import { AuthenticationError } from "@/common/errors";
import { verify } from "@/common/utils/encryption";
import { generateAccessToken, generateRefreshToken } from "@/common/utils/jwt";
import UserService from "@/modules/users/services/user.service";

@injectable()
export default class AuthService {
  constructor(private readonly userService: UserService) {}

  public async login(
    username: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid credentials");
    }

    const tokenPayload = {
      userId: user.id,
      username: user.username,
    };

    return {
      accessToken: generateAccessToken(tokenPayload),
      refreshToken: generateRefreshToken(tokenPayload),
    };
  }
}
