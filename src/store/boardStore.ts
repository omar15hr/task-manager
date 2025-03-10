import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board, List, Task, Id } from "@/types";

interface State {
  boards: Board[];
  selectedBoard: Board | null;
  setBoardSelected: (board: Board) => void;
  addBoard: (board: Board) => void;
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
      };
    },
    {
      name: "boardStore",
    }
  )
);
