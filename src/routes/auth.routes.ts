import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import verifyToken from "../middlewares/verifyToken.middleware";
import UserController from "../controllers/user.controller";
import { body, checkExact } from "express-validator";

class AuthRoutes {
  authRouter = Router();
  authController = new AuthController();
  userController = new UserController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // this.authRouter.post(
    //   "/register",
    //   body("name").trim().notEmpty().withMessage("The name field is required!"),
    //   body("email").notEmpty().isEmail(),
    //   body("password")
    //     .trim()
    //     .notEmpty()
    //     .withMessage("The password field is required!")
    //     .isLength({ min: 6 })
    //     .withMessage("The password required at least 6 characters"),
    //   this.userController.store
    // );
    this.authRouter.post(
      "/register",
      checkExact(
        [body("email").isEmail(), body("password").isLength({ min: 8 })],
        {
          message: "Too many fields specified",
        }
      ),
      this.userController.store
    );
    this.authRouter.post("/login", this.authController.login);
    this.authRouter.post("/logout", verifyToken, this.authController.logout);
    this.authRouter.get("/profile", verifyToken, this.authController.profile);
  }
}

export default new AuthRoutes().authRouter;
