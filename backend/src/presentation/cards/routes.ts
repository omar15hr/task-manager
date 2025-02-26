import { Router } from "express";
import { CardsController } from "./controller";

export class CardsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CardsController();

    // Definir las rutas
    router.get('', controller.getCards );
    router.post('', controller.createCard );
    router.put('/:cardId', controller.updateCard );
    router.delete('/:cardId', controller.deleteCard );

    return router;
  }
}
