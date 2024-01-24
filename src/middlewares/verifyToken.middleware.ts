import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import configs from "../configs";
import AuthenticatedRequest from "../requests/authenticated.request";
import sendErrorResponse from "../helpers/sendErrorResponse.helper";
import RedisClient from "../configs/cache.config";
const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const getToken = req.headers.authorization?.replace("Bearer ", "");
    if (!getToken) throw new Error("Token missing from request");
    const redis = RedisClient.getCache();
    const token = await redis.get("token");
    console.log(token);
    const verifiedToken = jwt.verify(getToken, configs.tokenKey as string);
    req.user = verifiedToken;
    next();
  } catch (err: any) {
    sendErrorResponse(res, err, 401);
  }
};

export default verifyToken;
