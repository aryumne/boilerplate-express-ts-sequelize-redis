import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import Database from "./configs/database.config";
import Cache from "./configs/cache.config";
import useragent from "express-useragent";
export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    this.syncCache();
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(useragent.express());
  }

  private syncCache(): void {
    new Cache();
  }

  private syncDatabase(): void {
    new Database();
    // const db = new Database();
    // db.initDb?.sync({ alter: true });
  }
}
