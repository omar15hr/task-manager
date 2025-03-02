import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";

export class TasksController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  };

  getTasks = (req: Request, res: Response) => {
    res.send("getTasks");
  };

  createTask = (req: Request, res: Response) => {
    res.send("createTask");
  };

  updateTask = (req: Request, res: Response) => {
    res.send("updateTask");
  };

  deleteTask = (req: Request, res: Response) => {
    res.send("deleteTask");
  };
}
