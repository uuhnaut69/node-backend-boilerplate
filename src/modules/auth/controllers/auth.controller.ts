import { Request, Response } from "ultimate-express";

import { injectable } from "tsyringe";

import { AuthenticationError } from "@/common/errors";
import { responseSuccess } from "@/common/utils/http";
import { generateAccessToken, verifyToken } from "@/common/utils/jwt";
import LoginRequest from "@/modules/auth/dtos/login.request";
import LoginResponse from "@/modules/auth/dtos/login.response";
import RefreshTokenRequest from "@/modules/auth/dtos/refresh-token.request";
import RefreshTokenResponse from "@/modules/auth/dtos/refresh-token.response";
import AuthService from "@/modules/auth/services/auth.service";

@injectable()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  public async login(
    req: Request<{}, {}, LoginRequest>,
    res: Response<LoginResponse>
  ) {
    const { username, password } = req.body;
    const tokenInfo = await this.authService.login(username, password);
    responseSuccess(req, res, tokenInfo);
  }

  public async refresh(
    req: Request<{}, {}, RefreshTokenRequest>,
    res: Response<RefreshTokenResponse>
  ) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AuthenticationError("Refresh token is required");
    }

    const payload = verifyToken(refreshToken, true);
    delete payload?.iat;
    delete payload?.exp;

    const accessToken = generateAccessToken(payload);

    responseSuccess(req, res, { accessToken });
  }
}
