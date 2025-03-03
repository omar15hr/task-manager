import { Types } from "mongoose";
import { Task } from "../../data/mongo/models/task.model";
import { UpdateTaskDto } from "../../domain/dtos/task/update-task.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateTaskDto } from "./../../domain/dtos/task/create-task.dto";
export class TaskService {
  constructor() {}

  async createTask(createTaskDto: CreateTaskDto, listId: string) {
    try {
      const task = new Task({
        name: createTaskDto.name,
        description: "",
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
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }


  async getTasks(listId: string) {
    try {
      const tasks = await Task.find({ list: listId });
      return tasks.map((task) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        listId: task.list,
        isCompleted: task.isCompleted,
      }));
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }


  async getTaskById(taskId: string) {
    try {
      const task = await Task.findById(taskId);
      if (!task) throw CustomError.notFound("Task not found");

      return {
        id: task.id,
        name: task.name,
        description: task.description,
        listId: task.list,
        isCompleted: task.isCompleted,
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto, taskId: string) {
    try {
      const updateData: { [key: string]: any } = {};
      if (updateTaskDto.name) updateData.name = updateTaskDto.name;
      if (updateTaskDto.description) updateData.description = updateTaskDto.description;
      if (updateTaskDto.isCompleted !== undefined) updateData.isCompleted = updateTaskDto.isCompleted;
      if (updateTaskDto.listId) updateData.list = updateTaskDto.listId;
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  
      if (!updatedTask) {
        throw CustomError.notFound("Task not found");
      }
  
      return {
        id: updatedTask.id,
        name: updatedTask.name,
        description: updatedTask.description,
        listId: updatedTask.list,
        isCompleted: updatedTask.isCompleted,
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async deleteTask(taskId: string) {
    try {

      if (!Types.ObjectId.isValid(taskId)) {
        throw CustomError.badRequest("Invalid task ID format");
      }

      if (!taskId) return { message: "Task ID is required" };
      
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) throw CustomError.notFound("Task not found");

      return {
        id: deletedTask.id,
        name: deletedTask.name,
        description: deletedTask.description,
        listId: deletedTask.list,
        isCompleted: deletedTask.isCompleted,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async deleteTaskByListId(listId: string) {
    try {

      const deletedTasks = await Task.deleteMany({ list: listId });
      if (!deletedTasks) throw CustomError.notFound("Task not found");

      return {
        message: 'Tasks deleted successfully',
      };
      
    } catch (error) {
      throw CustomError.internalServerError(`Error deleting tasks: ${error}`);
    }
  }
  
}
