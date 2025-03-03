import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateTaskDto } from "../../domain/dtos/task/create-task.dto";
import { TaskService } from "../services/task.service";

export class TasksController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  };

  getTasks = (req: Request, res: Response) => {
    res.send("getTasks");
  };

  getTaskById = (req: Request, res: Response) => {
    res.send("getTaskById");
  };

  createTask = (req: Request, res: Response) => {
    const [error, createTaskDto] = CreateTaskDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const { listId } = req.params;

    this.taskService.createTask(createTaskDto!, listId)
      .then((task) => res.status(201).json(task))
      .catch((error) => this.handleError(error, res));
  };

  updateTask = (req: Request, res: Response) => {
    res.send("updateTask");
  };

  deleteTask = (req: Request, res: Response) => {
    res.send("deleteTask");
  };
}
