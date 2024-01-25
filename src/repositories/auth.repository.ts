import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import configs from "../configs";
import jwt from "jsonwebtoken";
import BaseRepository from "./base.repository";
import LoginActivity from "../models/loginActivity.model";
import { useCache, getDevice, useDb } from "../helpers";

interface IAuthRepository {
  signIn(
    email: string,
    password: string,
    userAgent: any,
    reqIp: string | null
  ): Promise<String>;
  signOut(token: string): Promise<number>;
}

class AuthRepository extends BaseRepository implements IAuthRepository {
  async signIn(
    email: string,
    password: string,
    userAgent: any,
    reqIp: string | null
  ): Promise<String> {
    const dbTransaction = await useDb().transaction();
    try {
      // Get user data
      const user = await UserModel.findOne({
        where: { email: email },
      });
      if (user && user.password) {
        // compare the password input
        const validPassword = bcrypt.compareSync(
          `${password}${configs.saltKey}`,
          user.password
        );
        if (!validPassword)
          this.handleCustomError("Password is incorrect!", 422);

        // create new jwt token
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

        // add token as new element on cache which the name of key is jwtSetKey
        const result = await useCache().sadd(configs.jwtSetKey, token);
        if (result === 0) this.handleCustomError("Failed to set token!");

        // create new login activity
        await LoginActivity.create(
          {
            userId: user.id,
            device: getDevice(userAgent),
            os: userAgent?.os,
            browser: userAgent?.browser,
            ipAddress: reqIp,
          },
          { transaction: dbTransaction }
        );

        await dbTransaction.commit();
        return token;
      } else {
        this.handleCustomError("User not found!", 404);
      }
    } catch (error) {
      await dbTransaction.rollback();
      console.error("Error on auth repository : signIn = ", error);
      throw error;
    }
  }

  async signOut(token: string): Promise<number> {
    try {
      const res = await useCache().srem(configs.jwtSetKey, token);
      return res;
    } catch (error) {
      console.error("Error on auth repository : logout = ", error);
      throw error;
    }
  }
}

export default new AuthRepository();
