import { Router } from "express";
import { TasksController } from "./controller";
import { TaskService } from "../services/task.service";

export class TasksRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TasksController(taskService);

    // Definir las rutas
    router.get("/", controller.getTasks);
    router.get("/:id", controller.getTaskById);
    router.post("/:listId/tasks", controller.createTask);
    router.put("/:id", controller.updateTask);
    router.delete("/:id", controller.deleteTask);

    return router;
  }
}
