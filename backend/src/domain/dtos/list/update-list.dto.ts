export class UpdateListDto {
  private constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly isCompleted?: boolean,
    public readonly listId?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateListDto?] {
    const { name } = object;

    if (name.length < 3) return ["Name must be at least 3 characters"];
    if (name.length > 40) return ["Name must be at most 40 characters"];

    return [undefined, new UpdateListDto(name)];
  }
}
