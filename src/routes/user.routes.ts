import { Router } from "express";
import UserController from "../controllers/user.controller";
import verifyToken from "../middlewares/verifyToken.middleware";

class UserRoutes {
  userRouter = Router();
  userController = new UserController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // apply verifyToken middleware to all user routes
    this.userRouter.use(verifyToken);

    this.userRouter.get("/", this.userController.index);
    this.userRouter.get("/:id", this.userController.show);
    this.userRouter.post("/", this.userController.store);
    this.userRouter.patch("/:id", this.userController.update);
    this.userRouter.delete("/:id", this.userController.delete);
  }
}

export default new UserRoutes().userRouter;
