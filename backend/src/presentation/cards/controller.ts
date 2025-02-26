import { Request, Response } from "express";

export class CardsController {
  constructor() {}

  createCard = (req: Request, res: Response) => {
    res.send('createCard');
  }

  getCards = (req: Request, res: Response) => {
    res.send('getCards');
  }

  deleteCard = (req: Request, res: Response) => {
    res.send('deleteCard');
  }

  updateCard = (req: Request, res: Response) => {
    res.send('updateCard');
  }

}