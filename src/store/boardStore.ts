import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board, List, Task, Id } from "@/types";

interface State {
  boards: Board[];
  addBoard: (board: Board) => void;
}

export const boardStore = create<State>()(
  persist(
    (set, get) => {
      return {
        boards: [],
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
