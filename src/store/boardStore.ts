import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board, List, Task } from "@/types";

interface State {
  boards: Board[];
  selectedBoard: Board | null;
  setBoardSelected: (board: Board) => void;
  addBoard: (board: Board) => void;
  lists: List[];
  addList: (list: List) => void;
  setLists: (lists: List[]) => void;
  tasks: Task[];
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
}

export const boardStore = create<State>()(
  persist(
    (set) => {
      return {
        boards: [],
        selectedBoard: null,
        setBoardSelected: (board) => {
          set(() => ({
            selectedBoard: board,
          }));
        },
        addBoard: (board) => {
          set((state) => ({
            boards: [...state.boards, board],
          }));
        },
        lists: [],
        addList: (list) => {
          set((state) => ({
            lists: [...state.lists, list],
          }));
        },
        setLists: (lists) => {
          set(() => ({
            lists,
          }));
        },
        tasks: [],
        addTask: (task) => {
          set((state) => ({
            tasks: [...state.tasks, task],
          }));
        },
        setTasks: (tasks) => {
          set(() => ({
            tasks,
          }));
        },
      };
    },
    {
      name: "boardStore",
    }
  )
);
