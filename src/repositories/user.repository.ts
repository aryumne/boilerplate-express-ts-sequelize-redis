import { Op, ValidationErrorItem } from "sequelize";
import UserModel from "../models/user.model";
import BaseRepository from "./base.repository";
interface IUserRepository {
  save(user: UserModel): Promise<UserModel>;
  getAll(searcParams: { name: string }): Promise<UserModel[]>;
  getOne(uuid: string): Promise<UserModel | null>;
  update(uuid: string, user: UserModel): Promise<number>;
  delete(id: string): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

interface ErrorValidationObject {
  message: string;
  path: string;
}

class UserRepository extends BaseRepository implements IUserRepository {
  async save(user: UserModel): Promise<UserModel> {
    try {
      return await UserModel.create({
        name: user?.name,
        email: user?.email,
        password: user?.password,
      });
    } catch (error: any) {
      this.handleCustomError("Failed to create user!", 422);
    }
  }

  async getAll(searcParams: { name?: string }): Promise<UserModel[]> {
    try {
      let condition: SearchCondition = {};
      if (searcParams?.name)
        condition.name = { [Op.like]: `%${searcParams?.name}%` };
      return await UserModel.findAll({ where: condition });
    } catch (error) {
      this.handleCustomError("Failed to retrieve users!");
    }
  }

  async getOne(uuid: string): Promise<UserModel | null> {
    try {
      const user = await UserModel.findByPk(uuid);
      if (user === null) this.handleCustomError("User not found!", 404);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(uuid: string, user: UserModel): Promise<number> {
    try {
      await this.getOne(uuid);
      const affectedRows = await UserModel.update(
        {
          name: user?.name,
          email: user?.email,
        },
        { where: { id: uuid } }
      );
      if (affectedRows[0] !== 1)
        this.handleCustomError(
          "Cannot update user. Maybe the user was not found or req.body is empty!",
          404
        );
      return affectedRows[0];
    } catch (error) {
      throw error;
    }
  }

  async delete(uuid: string): Promise<number> {
    try {
      await this.getOne(uuid);
      const affectedRows = await UserModel.destroy({ where: { id: uuid } });
      return affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();
