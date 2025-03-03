import { List } from "../../data/mongo/models/list.model";
import { CreateListDto } from "../../domain/dtos/list/create-list.dto";
import { UpdateListDto } from "../../domain/dtos/list/update-list.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ListService {
  constructor() {}

  async createList(createListDto: CreateListDto) {
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
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getLists() {
    try {
      const lists = await List.find();

      return lists.map((list) => ({
        id: list.id,
        name: list.name,
      }));
    } catch (error) {
      throw CustomError.internalServerError("Internal Server Error");
    }
  }

  async updateList(updateListDto: UpdateListDto, listId: string) {
    try {

      const updatedList = await List.findByIdAndUpdate(listId, updateListDto, { new: true });

      if (!updatedList) {
        throw CustomError.notFound("List not found");
      }

      return {
        id: updatedList.id,
        name: updatedList.name,
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
