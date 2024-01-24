import { Request, Response } from "express";
import AuthenticatedRequest from "../requests/authenticated.request";
import UserModel from "../models/user.model";
import userRepository from "../repositories/user.repository";
import sendErrorResponse from "../helpers/sendErrorResponse.helper";
import CustomError from "../helpers/customError.helper";

export default class UserController {
  async index(req: AuthenticatedRequest, res: Response) {
    try {
      const users = await userRepository.getAll(req.query);
      res.json({ status: true, data: users, message: "Users list." });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async show(req: Request, res: Response) {
    if (!req.params.id) throw new CustomError("The user id not found!", 404);
    const uuid: string = req.params?.id;
    try {
      const user = await userRepository.getOne(uuid);
      if (user === null) {
        res
          .status(404)
          .json({ status: false, data: null, message: "User not found!" });
        return;
      }
      res.json({ status: true, data: user, message: "Data user." });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async store(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).json({
        message: "Content can not be empty!",
      });
      return;
    }

    try {
      const user: UserModel = req.body;
      const saveduser = await userRepository.save(user);

      res.status(201).json({
        status: true,
        data: saveduser,
        message: "The user has created successfully.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    if (!req.params.id) throw new CustomError("The user id not found!", 404);
    const uuid: string = req.params?.id;
    try {
      if (
        req.body === null ||
        req.body === undefined ||
        Object.keys(req.body).length === 0
      )
        throw new CustomError(
          "The request body is required, at least one attribute!",
          422
        );
      const user: UserModel = req.body;
      const updatedUser = await userRepository.update(uuid, user);
      res.json({
        status: true,
        data: updatedUser,
        message: "The user has updated successfully.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    if (!req.params.id) throw new CustomError("The user id not found!", 404);
    const uuid: string = req.params?.id;
    try {
      const deleteUser = await userRepository.delete(uuid);
      res.json({
        status: true,
        data: deleteUser,
        message: "The user has deleted successfully.",
      });
    } catch (error: any) {
      sendErrorResponse(res, error);
    }
  }
}
