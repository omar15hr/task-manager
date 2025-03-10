import { Board, List, Task } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

const INITIAL_BOARDS = [{ id: 1, title: "Board 1" }];

const INITIAL_LISTS = [
  { id: 1, title: "List 1", boardId: 1 },
  { id: 2, title: "List 2", boardId: 1 },
  { id: 3, title: "List 3", boardId: 1 },
  { id: 4, title: "List 4", boardId: 1 },
];

const INITIAL_TASKS = [
  { id: 1, title: "Task 1", listId: 1 },
  { id: 2, title: "Task 2", listId: 1 },
  { id: 3, title: "Task 3", listId: 1 },
  { id: 4, title: "Task 4", listId: 2 },
  { id: 5, title: "Task 5", listId: 1 },
  { id: 6, title: "Task 6", listId: 3 },
  { id: 7, title: "Task 7", listId: 3 },
  { id: 8, title: "Task 8", listId: 3 },
  { id: 9, title: "Task 9", listId: 1 },
  { id: 10, title: "Task 10", listId: 1 },
]; 

interface State {
  boards: Board[];
  lists: List[];
  tasks: Task[];
  addBoard: (title: string) => void;
  addList: (boardId: number, title: string) => void;
  addTask: (listId: number, title: string) => void;
  moveList: (oldIndex: number, newIndex: number) => void;
  moveTask: (oldIndex: number, newIndex: number) => void;
}

export const boardStore = create<State>((set) => ({
  boards: INITIAL_BOARDS,
  lists: INITIAL_LISTS,
  tasks: INITIAL_TASKS,
  addBoard: (title) =>
    set((state) => ({
      boards: [...state.boards, { id: Date.now(), title }],
    })),
  addList: (boardId, title) =>
    set((state) => ({
      lists: [...state.lists, { id: Date.now(), title, boardId }],
    })),
  addTask: (listId, title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title, listId }],
    })),
  moveList: (oldIndex, newIndex) =>
    set((state) => ({
      lists: arrayMove(state.lists, oldIndex, newIndex)
    })),
    moveTask: (oldIndex, newIndex) =>
      set((state) => ({
        tasks: arrayMove(state.tasks, oldIndex, newIndex)
      })),
}));
