import taskRoutes from "./task.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import { Application } from "express";

export default class Routes {
  constructor(app: Application) {
    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);
    app.use("/users", userRoutes);
    app.get("/test", (req, res) => {
      return res.status(200).json({
        data: {
          browser: req.useragent?.browser,
          os: req.useragent?.os,
          platform: req.useragent?.platform,
          ip: req.ip,
          source: req.useragent,
        },
      });
    });
  }
}
