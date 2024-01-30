import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import configs from "../configs";
import { extractToken, useCache } from "../helpers";
import AuthenticatedRequest from "../requests/authenticated.request";
import sendErrorResponse from "../helpers/sendErrorResponse.helper";
import CustomError from "../exceptions/customError";
const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";
  try {
    token = extractToken(req);
    const tokenExist = await useCache().sismember(configs.jwtSetKey, token);
    if (tokenExist === 0) throw new CustomError("The token is not valid!", 401);
    const verifiedToken = jwt.verify(token, configs.tokenKey as string);
    req.token = token;
    req.user = verifiedToken;
    next();
  } catch (err: any) {
    await useCache().srem(configs.jwtSetKey, token);
    sendErrorResponse(res, err, 401);
  }
};

export default verifyToken;
