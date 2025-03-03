import { Task } from "../../data/mongo/models/task.model";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateTaskDto } from "./../../domain/dtos/task/create-task.dto";
export class TaskService {
  constructor() {}

  async createTask(createTaskDto: CreateTaskDto, listId: string) {
    try {

      const task = new Task({
        name: createTaskDto.name,
        description: '',
        list: listId,
        isCompleted: false,
      });

      await task.save();

      return {
        id: task.id,
        name: task.name,
        description: task.description,
        listId: task.list,
        isCompleted: task.isCompleted,
      }

    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getTasks() {}

  async getTaskById(listId: string) {
    try {

      const task = await Task.findById({ list: listId });
      if (!task) throw CustomError.notFound("Task not found");

      return {
        id: task.id,
        name: task.name,
        description: task.description,
        listId: task.list,
        isCompleted: task.isCompleted,
      }
      
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
