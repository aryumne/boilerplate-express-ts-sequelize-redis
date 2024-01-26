import CustomError from "../exceptions/customError";

interface IBaseRepository {}
class BaseRepository implements IBaseRepository {
  protected handleCustomError(
    message: string,
    statusCode: number = 400,
    stack: any = null
  ): never {
    throw new CustomError(message, statusCode, stack);
  }
}

export default BaseRepository;
