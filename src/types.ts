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
  id: number;
  title: string;
}
