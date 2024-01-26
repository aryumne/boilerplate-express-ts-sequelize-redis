class CustomError extends Error {
  statusCode: number;
  stack: any | null;
  constructor(
    message: string,
    statusCode: number = 400,
    stack: any | null = null
  ) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
    this.stack = stack;
  }
}

export default CustomError;
