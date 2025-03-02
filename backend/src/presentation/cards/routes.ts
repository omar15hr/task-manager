import { Router } from "express";
import { TasksController } from "./controller";

export class CardsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TasksController();

    // Definir las rutas
    router.get('', controller.getTasks );
    router.post('', controller.createTask );
    router.put('/:cardId', controller.updateTask );
    router.delete('/:cardId', controller.deleteTask );

    return router;
  }
}
