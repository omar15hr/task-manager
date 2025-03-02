import { List } from "../../data/mongo/models/list.model";
import { CreateListDto } from "../../domain/dtos/list/create-list.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ListService {
  constructor() {}

  async createList ( createListDto: CreateListDto) {
    const list = await List.findOne({ name: createListDto.name });
    if (list) throw CustomError.badRequest("List already exists");

    try {

      const newList = new List({
        ...createListDto
      });

      await newList.save();

      return {
        id: newList.id,
        name: newList.name,
        tasks: [],
      }
      
    } catch (error) {
      throw CustomError.internalServerError("Internal Server Error");
    }
  }
}