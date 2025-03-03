import { List } from "../../data/mongo/models/list.model";
import { CreateListDto } from "../../domain/dtos/list/create-list.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ListService {
  constructor() {}

  async createList ( createListDto: CreateListDto) {
    const listExists = await List.findOne({ name: createListDto.name });
    if (listExists) throw CustomError.badRequest("List already exists");

    try {

      const list = new List({
        name: createListDto.name,
      });

      await list.save();

      return {
        id: list.id,
        name: list.name,
      }
      
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getLists() {
    try {

      const lists = await List.find();

      return lists.map(list => ({
        id: list.id,
        name: list.name,
      }))
      
    } catch (error) {
      throw CustomError.internalServerError('Internal Server Error');
    }
  }
}