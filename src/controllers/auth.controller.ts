import { Request, Response } from "express";
import AuthRepository from "../repositories/auth.repository";
import AuthenticatedRequest from "../requests/authenticated.request";
import UserRepository from "../repositories/user.repository";
import sendErrorResponse from "../helpers/sendErrorResponse.helper";

export default class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthRepository.signIn(email, password);
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
        data: user,
        message: "Your profile.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      await AuthRepository.signOut();
      res.status(200).json({
        status: true,
        data: null,
        message: "Logout success.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }
}
