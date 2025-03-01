export class CreateListDto {

  private constructor(
    public readonly name: string,
  ) {}

  static create( object: { [key: string]: any } ): [string?, CreateListDto?] {
    const { name } = object;

    if (!name) throw new Error("Missing name");
    if (name.length < 3) throw new Error("Name must be at least 3 characters");
    if (name.length > 20) throw new Error("Name must be at most 20 characters");
    if (name.startWith(" ")) throw new Error("Name cannot start with a space");

    return [undefined, new CreateListDto(name)];
  }
}