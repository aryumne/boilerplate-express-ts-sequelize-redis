import CustomError from "../exceptions/customError";

class BaseController {
  protected handleCustomError(
    message: string,
    statusCode: number = 400
  ): never {
    throw new CustomError(message, statusCode);
  }
}

export default BaseController;
