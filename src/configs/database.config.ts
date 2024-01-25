import configs from ".";
import { Sequelize } from "sequelize-typescript";
import User from "../models/user.model";
import LoginActivity from "../models/loginActivity.model";

export default class Database {
  public initDb!: Sequelize;
  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.initDb = new Sequelize({
      database: configs.dbDatabase,
      username: configs.dbUsername,
      password: configs.dbPassword,
      host: configs.dbHost,
      dialect: "mysql",
      models: [User, LoginActivity],
    });

    await this.initDb
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to Database: ", error);
      });
  }

  public getDb(): Sequelize {
    return this.initDb;
  }
}
