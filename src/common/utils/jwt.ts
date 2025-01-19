import jwt from "jsonwebtoken";

import { AuthenticationError } from "@/common/errors";
import env from "@/common/utils/env";

export interface TokenPayload {
  userId: string;
  username: string;
  exp?: number;
  iat?: number;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyToken = (
  token: string,
  isRefreshToken = false
): TokenPayload => {
  try {
    return jwt.verify(
      token,
      isRefreshToken ? env.JWT_REFRESH_SECRET : env.JWT_SECRET
    ) as TokenPayload;
  } catch (error) {
    throw new AuthenticationError("Invalid token", error);
  }
};
