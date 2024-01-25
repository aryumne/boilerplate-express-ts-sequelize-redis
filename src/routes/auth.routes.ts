import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
import UserController from "../controllers/user.controller";

class AuthRoutes {
  authRouter = Router();
  authController = new AuthController();
  userController = new UserController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.authRouter.post("/register", this.userController.store);
    this.authRouter.post("/login", this.authController.login);
    this.authRouter.post("/logout", verifyToken, this.authController.logout);
    this.authRouter.get("/profile", verifyToken, this.authController.profile);
  }
}

export default new AuthRoutes().authRouter;
