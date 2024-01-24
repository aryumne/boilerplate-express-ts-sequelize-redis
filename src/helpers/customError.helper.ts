class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

export default CustomError;
