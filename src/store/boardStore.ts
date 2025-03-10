import { Board, List, Task } from "@/types";
import { create } from "zustand";

interface State {
  boards: Board[];
  lists: List[];
  tasks: Task[];
  addBoard: (title: string) => void;
  addList: (boardId: number, title: string) => void;
  addTask: (listId: number, title: string) => void;
  moveList: (listId: number, targetBoardId: number) => void;
  reorderLists: (boardId: number, startIndex: number, endIndex: number) => void;
  moveTask: (taskId: number, targetListId: number) => void;
  reorderTasks: (listId: number, startIndex: number, endIndex: number) => void;
}

export const boardStore = create<State>((set) => ({
  boards: [{ id: 1, title: "Board 1" }],
  lists: [
    { id: 1, title: "List 1", boardId: 1 },
    { id: 2, title: "List 2", boardId: 1 },
    { id: 3, title: "List 3", boardId: 1 },
    { id: 4, title: "List 4", boardId: 1 },
  ],
  tasks: [
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
  ],
  addBoard: (title) =>
    set((state) => ({
      boards: [...state.boards, { id: Date.now(), title }],
    })),
  addList: (boardId, title) =>
    set((state) => ({
      lists: [...state.lists, { id: Date.now(), title, boardId }],
    })),
  moveList: (listId, targetBoardId) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId ? { ...list, boardId: targetBoardId } : list
      ),
    })),
  reorderLists: (boardId, startIndex, endIndex) =>
    set((state) => {
      const lists = state.lists.filter((list) => list.boardId === boardId);
      const [movedList] = lists.splice(startIndex, 1);
      lists.splice(endIndex, 0, movedList);
      return {
        lists: [
          ...state.lists.filter((list) => list.boardId !== boardId),
          ...lists,
        ],
      };
    }),
  addTask: (listId, title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title, listId }],
    })),
  moveTask: (taskId, targetListId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, listId: targetListId } : task
      ),
    })),
  reorderTasks: (listId, startIndex, endIndex) =>
    set((state) => {
      const tasks = state.tasks.filter((task) => task.listId === listId);
      const [movedTask] = tasks.splice(startIndex, 1);
      tasks.splice(endIndex, 0, movedTask);
      return {
        tasks: [
          ...state.tasks.filter((task) => task.listId !== listId),
          ...tasks,
        ],
      };
    }),
}));
