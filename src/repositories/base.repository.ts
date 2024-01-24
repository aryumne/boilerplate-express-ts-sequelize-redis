import CustomError from "../helpers/customError.helper";

class BaseRepository {
  protected handleCustomError(
    message: string,
    statusCode: number = 400
  ): never {
    throw new CustomError(message, statusCode);
  }
}

export default BaseRepository;
