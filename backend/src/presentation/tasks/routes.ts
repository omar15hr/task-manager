import { Router } from "express";
import { TasksController } from "./controller";
import { TaskService } from "../services/task.service";

export class TasksRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TasksController(taskService);

    // Definir las rutas
    router.get("/:listId/tasks", controller.getTasks);
    router.get("/:taskId", controller.getTaskById);
    router.post("/:listId/tasks", controller.createTask);
    router.put("/:taskId", controller.updateTask);
    router.delete("/:taskId", controller.deleteTask);

    return router;
  }
}
