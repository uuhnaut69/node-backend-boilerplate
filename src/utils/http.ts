import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Response } from "hyper-express";

export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data?: T;
}

/**
 * Send a response with status OK
 *
 * @param res Response
 * @param data Data to be returned
 * @param message Message to be returned
 */
export function responseOk<T>(
  res: Response,
  data: T,
  message: ReasonPhrases = ReasonPhrases.OK
) {
  const response: ApiResponse<T> = {
    status: "OK",
    code: StatusCodes.OK,
    message,
    data,
  };

  res.status(200).json(response);
}

/**
 * Send a response with status ERROR
 *
 * @param res Response
 * @param message Message to be returned
 * @param code Status code to be returned
 */
export function responseError(
  res: Response,
  message: string,
  code: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
) {
  const response: ApiResponse<null> = {
    status: "ERROR",
    code,
    message,
  };

  res.status(code).json(response);
}
