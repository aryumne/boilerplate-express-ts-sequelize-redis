import { Response } from "express";
import CustomError from "./customError.helper";

interface ErrorResponseOptions {
  status: boolean;
  data: any;
  message: string;
}

const sendErrorResponse = (
  res: Response,
  error: Error,
  statusCode: number = 500
): void => {
  const responseOptions: ErrorResponseOptions = {
    status: false,
    data: error instanceof CustomError ? null : error.message,
    message:
      error instanceof CustomError ? error.message : "Internal server error!",
  };
  statusCode = error instanceof CustomError ? error.statusCode : statusCode;
  res.status(statusCode).json(responseOptions);
};

export default sendErrorResponse;
