import { CustomError } from "../errors/custom.error";

export class ListEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tasks: string[]
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, tasks } = object;

    if (!id && !_id) throw CustomError.badRequest("Missing id");
    if (!name) throw CustomError.badRequest("Missing name");

    return new ListEntity(_id || id, name, tasks);
  }
}