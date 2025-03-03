import { Router } from "express";
import { ListsController } from "./controller";
import { ListService } from "../services/list.service";
import { TaskService } from "../services/task.service";

export class ListsRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const listService = new ListService(taskService);
    const controller = new ListsController(listService);

    // Definir las rutas
    router.get('/', controller.getLists );
    router.post('/', controller.createList );
    router.put('/:listId', controller.updateList );
    router.delete('/:listId', controller.deleteList );

    return router;
  }
}
