import { Router } from "express";
import { ListsRoutes } from "./lists/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use('/api/lists', ListsRoutes.routes );

    return router;
  }
}
