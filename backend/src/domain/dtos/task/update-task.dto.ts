export class UpdateTaskDto {
  private constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly isCompleted?: boolean,
    public readonly listId?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateTaskDto?] {
    const { name, description, isCompleted, listId } = object;

    if (isCompleted && !(typeof isCompleted === "boolean")) return ["isCompleted must be a boolean"];
    if (listId && !(typeof listId === "string")) return ["listId must be a string"];

    return [undefined, new UpdateTaskDto(name, description, isCompleted, listId)];
  }
}
