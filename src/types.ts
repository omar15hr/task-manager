export type Id = string | number

export interface Task {
  id: number;
  title: string;
  listId: number;
}

export interface List {
  id: number;
  title: string;
  boardId: number;
}

export interface Board {
  id: string;
  title: string;
  background: string;
}

export type ActiveTask = Task & { columnId: Id }
