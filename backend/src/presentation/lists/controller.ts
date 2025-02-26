import { Request, Response } from "express";

export class ListsController {
  constructor() {}

  createList = (req: Request, res: Response) => {
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