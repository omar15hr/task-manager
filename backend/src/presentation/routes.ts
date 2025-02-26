import { Router } from "express";
import { ListsRoutes } from "./lists/routes";
import { CardsRoutes } from "./cards/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use('/api/lists', ListsRoutes.routes );
    router.use('/api/lists/:listId/cards', CardsRoutes.routes );

    return router;
  }
}
