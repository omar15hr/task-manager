import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { ListService } from "../services/list.service";
import { CreateListDto } from "../../domain/dtos/list/create-list.dto";

export class ListsController {
  constructor( 
    private readonly listService: ListService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  createList = async (req: Request, res: Response) => {
    const [error, createListDto] = CreateListDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    try {
      const list = await this.listService.createList(createListDto!);
      res.status(201).json(list);
    } catch (error) {
      this.handleError(error, res);
    }
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