export class CreateListDto {
  private constructor(public readonly name: string) {}

  static create(object: { [key: string]: any }): [string?, CreateListDto?] {
    const { name } = object;

    if (!name) return ["Name is required"];
    if (name.length < 3) return ["Name must be at least 3 characters"];
    if (name.length > 20) return ["Name must be at most 20 characters"];

    return [undefined, new CreateListDto(name)];
  }
}
