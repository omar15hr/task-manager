export class TaskEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly listId: string,
    public readonly completed: string,
  ) {}
}