import dotenv from "dotenv";

dotenv.config();
const {
  PORT,
  APP_MODE,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  SALT_ROUNDS,
  SALT_KEY,
  TOKEN_KEY,
  TOKEN_EXPIRATION,
  CACHE_HOST,
  CACHE_PORT,
  JWT_SET_KEY,
} = process.env;
export default {
  port: PORT,
  appMode: APP_MODE,
  dbHost: DB_HOST,
  dbPort: DB_PORT,
  dbDatabase: DB_DATABASE,
  dbUsername: DB_USERNAME,
  dbPassword: DB_PASSWORD,
  saltRounds: SALT_ROUNDS,
  saltKey: SALT_KEY,
  tokenKey: TOKEN_KEY,
  tokenExpration: TOKEN_EXPIRATION || "5m",
  cacheHost: CACHE_HOST,
  cachePort: CACHE_PORT || 6379,
  jwtSetKey: JWT_SET_KEY || "tokens",
};
