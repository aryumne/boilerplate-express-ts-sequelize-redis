import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import verifyToken from "../middlewares/verifyToken.middleware";

class AuthRoutes {
  authRouter = Router();
  authController = new AuthController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.authRouter.post("/login", this.authController.login);
    this.authRouter.post("/logout", verifyToken, this.authController.logout);
    this.authRouter.get("/profile", verifyToken, this.authController.profile);
  }
}

export default new AuthRoutes().authRouter;
