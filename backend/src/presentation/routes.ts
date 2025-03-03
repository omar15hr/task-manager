import { Router } from "express";
import { ListsRoutes } from "./lists/routes";
import { TasksRoutes } from "./tasks/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use('/api/lists', ListsRoutes.routes );
    router.use('/api/tasks', TasksRoutes.routes );

    return router;
  }
}
