import { Request, Response } from "express";
import AuthRepository from "../repositories/auth.repository";
import AuthenticatedRequest from "../requests/authenticated.request";
import UserRepository from "../repositories/user.repository";
import sendErrorResponse from "../helpers/sendErrorResponse.helper";
import BaseController from "./base.controller";

export default class UserController extends BaseController {
  async login(req: Request, res: Response) {
    try {
      console.log(req.useragent);
      const { email, password } = req.body;
      const reqIp = req.ip || null;
      const userAgent = req.useragent || null;
      const token = await AuthRepository.signIn(
        email,
        password,
        userAgent,
        reqIp
      );
      res.status(200).json({
        status: true,
        data: { token: token },
        message: "Login success.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async profile(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await UserRepository.getOne(req.user.id);
      res.json({
        status: true,
        data: {
          user: user,
          token: req.user,
        },
        message: "Your profile.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async logout(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.token) {
        const result = await AuthRepository.signOut(req.token);
        res.status(200).json({
          status: true,
          data: result,
          message: "Logout success.",
        });
      }
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }
}
