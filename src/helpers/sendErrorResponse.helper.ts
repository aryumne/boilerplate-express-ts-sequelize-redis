import { Response } from "express";
import CustomError from "../exceptions/customError";

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
  let bodyMsg = error.message;

  let errorMsg =
    error.message == "jwt expired"
      ? "The token is expired!"
      : "Internal server error!";

  if (error instanceof CustomError) {
    errorMsg = error.message;
    if (error.stack !== undefined) bodyMsg = error.stack;
  }
  const responseOptions: ErrorResponseOptions = {
    status: false,
    data: bodyMsg,
    message: errorMsg,
  };
  statusCode = error instanceof CustomError ? error.statusCode : statusCode;
  res.status(statusCode).json(responseOptions);
};

export default sendErrorResponse;
