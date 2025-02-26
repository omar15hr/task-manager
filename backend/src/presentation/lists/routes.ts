import { Router } from "express";
import { ListsController } from "./controller";

export class ListsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ListsController();

    // Definir las rutas
    router.get('/', controller.getLists );
    router.post('/', controller.createList );
    router.put('/:id', controller.updateList );
    router.delete('/:id', controller.deleteList );

    return router;
  }
}
