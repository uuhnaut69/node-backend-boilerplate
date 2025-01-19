import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "ultimate-express";

export type ApiSuccessResponse<T> = T;

export interface ApiErrorResponse {
  error: {
    code: number;
    message: string;
    details?: unknown[];
  };
}

type ApiResponseOptions = {
  message?: string;
  details?: unknown[];
};

/**
 * Create error response object
 */
function createErrorResponse(
  code: number,
  options: ApiResponseOptions = {}
): ApiErrorResponse {
  return {
    error: {
      code,
      message: options.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
      details: options.details,
    },
  };
}

/**
 * Send success response (2xx)
 */
export function responseSuccess<T>(req: Request, res: Response, data: T) {
  // Add metadata in headers instead of response body
  res.set("X-Request-Path", req.path);
  res.set("X-Timestamp", new Date().toISOString());
  return res.status(StatusCodes.OK).json(data);
}

/**
 * Send created response (201)
 */
export function responseCreated<T>(req: Request, res: Response, data: T) {
  res.set("X-Request-Path", req.path);
  res.set("X-Timestamp", new Date().toISOString());
  return res.status(StatusCodes.CREATED).json(data);
}

/**
 * Send error response (4xx, 5xx)
 */
export function responseError(
  req: Request,
  res: Response,
  code: number = StatusCodes.INTERNAL_SERVER_ERROR,
  options: ApiResponseOptions = {}
) {
  const response = createErrorResponse(code, options);
  res.set("X-Request-Path", req.path);
  res.set("X-Timestamp", new Date().toISOString());
  return res.status(code).json(response);
}

/**
 * Send not found response (404)
 */
export function responseNotFound(
  req: Request,
  res: Response,
  options: ApiResponseOptions = {}
) {
  const response = createErrorResponse(StatusCodes.NOT_FOUND, {
    message: options.message || ReasonPhrases.NOT_FOUND,
    details: options.details,
  });
  res.set("X-Request-Path", req.path);
  res.set("X-Timestamp", new Date().toISOString());
  return res.status(StatusCodes.NOT_FOUND).json(response);
}
