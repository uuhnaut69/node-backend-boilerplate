import { NextFunction, Request, Response } from "ultimate-express";

import { AppError } from "@/common/errors";
import { responseError } from "@/common/utils/http";
import logger from "@/common/utils/logger";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  logger.error("Error occurred:", error);
  if (error instanceof AppError) {
    return responseError(req, res, error.statusCode, {
      message: error.message,
      details: error.data ? [error.data] : undefined,
    });
  }
}
