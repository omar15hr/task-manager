export class CreateTaskDto {
  private constructor(public readonly name: string) {}

  static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { name } = object;

    if (!name) return ["Name is required"];

    return [undefined, new CreateTaskDto(name)];
  }
}
