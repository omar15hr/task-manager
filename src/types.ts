export type Id = string | number

export interface Task {
  id: string;
  title: string;
  listId: string;
  isCompleted: boolean;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
  background: string;
}

export type ActiveTask = Task & { columnId: Id }
