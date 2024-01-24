import configs from ".";
import { Sequelize } from "sequelize-typescript";
import User from "../models/user.model";

export default class Database {
  public initDb: Sequelize | undefined;
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
      models: [User],
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
}
