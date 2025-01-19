import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly data?: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation Error", data?: any) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, data);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication Error", data?: any) {
    super(message, StatusCodes.UNAUTHORIZED, data);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden Error", data?: any) {
    super(message, StatusCodes.FORBIDDEN, data);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found Error", data?: any) {
    super(message, StatusCodes.NOT_FOUND, data);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict Error", data?: any) {
    super(message, StatusCodes.CONFLICT, data);
  }
}

export class InternalError extends AppError {
  constructor(message: string = "Internal Server Error", data?: any) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, data);
  }
}
