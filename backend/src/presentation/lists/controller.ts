import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";

export class ListsController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  createList = async(req: Request, res: Response) => {
    res.send('createList');
  }

  getLists = (req: Request, res: Response) => {
    res.send('getLists');
  }

  deleteList = (req: Request, res: Response) => {
    res.send('deleteList');
  }

  updateList = (req: Request, res: Response) => {
    res.send('updateList');
  }

}