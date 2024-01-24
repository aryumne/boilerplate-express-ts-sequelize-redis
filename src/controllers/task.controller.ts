import { Request, Response } from "express";
import { Task } from "../models/task.model";

let tasks: Task[] = [];
export default class TaskController {
  index(req: Request, res: Response) {
    res.status(200).json({ status: true, data: tasks, message: "List Tasks." });
  }
  store(req: Request, res: Response) {
    console.log(req);
    const task: Task = {
      id: tasks.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false,
    };

    tasks.push(task);
    res
      .status(201)
      .json({ status: true, data: tasks, message: "task has been created." });
  }
  show(req: Request, res: Response) {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
      res
        .status(404)
        .json({ status: false, data: {}, message: "Task not found!" });
    } else {
      res.json({ status: true, data: task, message: "Data task." });
    }
  }

  update(req: Request, res: Response) {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if (!task) {
      res.status(404).send("Task not found");
    } else {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.completed = req.body.completed || task.completed;

      res.json(task);
    }
  }
  delete(req: Request, res: Response) {
    const task = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if (!task) {
      res.status(404).send("Task not found");
    } else {
      tasks.splice(task, 1);
      res.json({ message: "Task deleted" });
    }
  }
}
