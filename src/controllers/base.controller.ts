import CustomError from "../exceptions/customError";

class BaseController {
  protected handleCustomError(
    message: string,
    statusCode: number = 400,
    stack: any = null
  ): never {
    throw new CustomError(message, statusCode, stack);
  }
}

export default BaseController;
