import { Router } from "express";
import TaskController from "../controllers/task.controller";

class TaskRoutes {
  taskRouter = Router();
  taskController = new TaskController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.taskRouter.get("/", this.taskController.index);
    this.taskRouter.get("/:id", this.taskController.show);
    this.taskRouter.post("/", this.taskController.store);
    this.taskRouter.patch("/:id", this.taskController.update);
    this.taskRouter.delete("/:id", this.taskController.delete);
  }
}

export default new TaskRoutes().taskRouter;
