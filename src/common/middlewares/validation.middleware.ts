import { NextFunction, Request, Response } from "ultimate-express";

import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { StatusCodes } from "http-status-codes";

import { responseError } from "@/common/utils/http";

export default function validateRequest(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formattedErrors = formatValidationErrors(errors);
      return responseError(req, res, StatusCodes.UNPROCESSABLE_ENTITY, {
        message: "Validation failed",
        details: [formattedErrors],
      });
    }

    req.body = dtoInstance;
    next();
  };
}

function formatValidationErrors(
  errors: ValidationError[]
): Record<string, string[]> {
  return errors.reduce(
    (acc, error) => {
      const constraints = error.constraints || {};
      acc[error.property] = Object.values(constraints);
      return acc;
    },
    {} as Record<string, string[]>
  );
}
