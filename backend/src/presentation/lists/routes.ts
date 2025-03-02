import { Router } from "express";
import { ListsController } from "./controller";
import { ListService } from "../services/list.service";

export class ListsRoutes {
  static get routes(): Router {
    const router = Router();

    const listService = new ListService();
    const controller = new ListsController(listService);

    // Definir las rutas
    router.get('/', controller.getLists );
    router.post('/', controller.createList );
    router.put('/:id', controller.updateList );
    router.delete('/:id', controller.deleteList );

    return router;
  }
}
