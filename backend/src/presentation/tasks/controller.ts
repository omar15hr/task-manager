import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateTaskDto } from "../../domain/dtos/task/create-task.dto";
import { TaskService } from "../services/task.service";
import { UpdateTaskDto } from "../../domain/dtos/task/update-task.dto";

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
    const { listId } = req.params;
    if (!listId) {
      res.status(400).json({ error: "List ID is required" });
      return;
    }

    this.taskService.getTasks(listId)
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => this.handleError(error, res));
  };


  getTaskById = (req: Request, res: Response) => {
    const [error] = CreateTaskDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const { taskId } = req.params;
    if (!taskId) {
      res.status(400).json({ error: "Task ID is required" });
      return;
    }

    this.taskService.getTaskById(taskId)
      .then((task) => res.status(200).json(task))
      .catch((error) => this.handleError(error, res));
  };


  createTask = (req: Request, res: Response) => {
    const [error, createTaskDto] = CreateTaskDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const { listId } = req.params;
    if (!listId) {
      res.status(400).json({ error: "List ID is required" });
      return;
    }

    this.taskService.createTask(createTaskDto!, listId)
      .then((task) => res.status(201).json(task))
      .catch((error) => this.handleError(error, res));
  };


  updateTask = (req: Request, res: Response) => {
    const [error, updateTaskDto] = UpdateTaskDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    const { taskId } = req.params;
    if (!taskId) {
      res.status(400).json({ error: "Task ID is required" });
      return;
    }

    this.taskService.updateTask(updateTaskDto!, taskId)
      .then((task) => res.status(201).json(task))
      .catch((error) => this.handleError(error, res));
  };


  deleteTask = (req: Request, res: Response) => {
    const { taskId } = req.params;
    if (!taskId) {
      res.status(400).json({ error: "Task ID is required" });
      return;
    }

    this.taskService.deleteTask(taskId)
      .then((task) => res.status(200).json(task))
      .catch((error) => this.handleError(error, res));
  };
}
