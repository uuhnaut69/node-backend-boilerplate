import { Request, Response } from "hyper-express";

import { ReasonPhrases, StatusCodes } from "http-status-codes";

export interface ApiResponse<T> {
  status: "success" | "error" | "fail";
  code: number;
  message: string;
  data?: T;
  timestamp: string;
  path: string;
}

type ApiResponseOptions = {
  message?: string;
  path?: string;
};

/**
 * Create API response object
 */
function createResponse<T>(
  status: "success" | "error" | "fail",
  code: number,
  data: T | null,
  options: ApiResponseOptions = {}
): ApiResponse<T> {
  return {
    status,
    code,
    message: options.message || ReasonPhrases.OK,
    data: data || undefined,
    timestamp: new Date().toISOString(),
    path: options.path || "/",
  };
}

/**
 * Send success response (2xx)
 */
export function responseSuccess<T>(
  req: Request,
  res: Response,
  data: T,
  options: ApiResponseOptions = {}
) {
  const response = createResponse<T>("success", StatusCodes.OK, data, {
    message: options.message || ReasonPhrases.OK,
    path: req.path,
  });
  return res.status(response.code).json(response);
}

/**
 * Send created response (201)
 */
export function responseCreated<T>(
  req: Request,
  res: Response,
  data: T,
  options: ApiResponseOptions = {}
) {
  const response = createResponse<T>("success", StatusCodes.CREATED, data, {
    message: options.message || ReasonPhrases.CREATED,
    path: req.path,
  });
  return res.status(response.code).json(response);
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
  const response = createResponse(code >= 500 ? "error" : "fail", code, null, {
    message: options.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    path: req.path,
  });
  return res.status(response.code).json(response);
}

/**
 * Send not found response (404)
 */
export function responseNotFound(
  req: Request,
  res: Response,
  options: ApiResponseOptions = {}
) {
  const response = createResponse("fail", StatusCodes.NOT_FOUND, null, {
    message: options.message || ReasonPhrases.NOT_FOUND,
    path: req.path,
  });
  return res.status(response.code).json(response);
}
