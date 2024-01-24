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
  CACHE_HOST,
  CACHE_PORT,
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
  cacheHost: CACHE_HOST,
  cachePort: CACHE_PORT || 6379,
};
