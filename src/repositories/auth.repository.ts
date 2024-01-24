import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import configs from "../configs";
import jwt from "jsonwebtoken";
import BaseRepository from "./base.repository";
import RedisClient from "../configs/cache.config";

const redis = RedisClient.getCache();

interface IAuthRepository {
  signIn(email: string, password: string): Promise<String>;
  signOut(token: string): Promise<number>;
}

class AuthRepository extends BaseRepository implements IAuthRepository {
  async signIn(email: string, password: string): Promise<String> {
    try {
      const user = await UserModel.findOne({
        where: { email: email },
      });
      if (user && user.password) {
        const validPassword = bcrypt.compareSync(
          `${password}${configs.saltKey}`,
          user.password
        );
        if (!validPassword)
          this.handleCustomError("Password is incorrect!", 400);

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          configs.tokenKey as string,
          {
            expiresIn: configs.tokenExpration,
          }
        );
        if (!token)
          this.handleCustomError("There is an error when issuing token!");

        const result = await redis.sadd(configs.jwtSetKey, token);
        if (result === 0) this.handleCustomError("Failed to set token!");
        return token;
      } else {
        this.handleCustomError("User not found!", 404);
      }
    } catch (error) {
      console.error("Error on auth repository : signIn = ", error);
      throw error;
    }
  }

  async signOut(token: string): Promise<number> {
    try {
      const res = redis.srem(configs.jwtSetKey, token);
      return res;
    } catch (error) {
      console.error("Error on auth repository : logout = ", error);
      throw error;
    }
  }
}

export default new AuthRepository();
