import AuthenticatedRequest from "../requests/authenticated.request";
import Cache from "../configs/cache.config";
import * as Redis from "ioredis";
import Database from "../configs/database.config";
import { Sequelize } from "sequelize-typescript";
import CustomError from "../exceptions/customError";

export const useCache = (): Redis.Redis => {
  const initializedCache = new Cache();
  const cache = initializedCache.getCache();
  return cache;
};

export const useDb = (): Sequelize => {
  const initializedDb = new Database();
  const db = initializedDb.getDb();
  return db;
};

export const extractToken = (req: AuthenticatedRequest): string => {
  try {
    const getToken = req.headers.authorization?.replace("Bearer ", "");
    if (!getToken) throw new Error("Token missing from request");
    return getToken;
  } catch (error) {
    throw error;
  }
};

export const getDevice = (userAgent: any): string => {
  let device = "";
  if (userAgent?.isiPad === true) {
    device = "iPad";
  } else if (userAgent?.isiPod === true) {
    device = "iPod";
  } else if (userAgent?.isAndroid === true) {
    device = "Android";
  } else if (userAgent?.isiPhone === true) {
    device = "iPhone";
  } else if (userAgent?.isDesktop === true) {
    device = "Desktop";
  } else if (userAgent?.isBot === true) {
    device = "Bot";
  } else {
    device = "unknown";
  }
  return device;
};

export const throwCustomError = (
  message: string,
  statusCode: number = 400,
  stack: string | undefined = undefined
): never => {
  throw new CustomError(message, statusCode, stack);
};
