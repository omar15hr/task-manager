import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board, List, Task } from "@/types";

interface State {
  boards: Board[];
  selectedBoard: Board | null;
  setBoardSelected: (board: Board) => void;
  addBoard: (board: Board) => void;
  deleteBoard: (boardId: string) => void;
  lists: List[];
  addList: (list: List) => void;
  moveList: (oldIndex: number, newIndex: number) => void;
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (
    oldListId: string,
    newListId: string,
    oldIndex: number,
    newIndex: number
  ) => void;
  toggleTaskCompletion: (taskId: string) => void;
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
        deleteBoard: (boardId) => {
          set((state) => {
            const updatedBoards = state.boards.filter(board => board.id !== boardId);
            const updatedLists = state.lists.filter(list => list.boardId !== boardId);
            const updatedTasks = state.tasks.filter(task => !updatedLists.some(list => list.id === task.listId));
        
            return {
              boards: updatedBoards,
              lists: updatedLists,
              tasks: updatedTasks
            };
          });
        },
        lists: [],
        addList: (list) => {
          set((state) => ({
            lists: [...state.lists, list],
          }));
        },
        moveList: (oldIndex, newIndex) => {
          set((state) => {
            const lists = [...state.lists];

            const [movedList] = lists.splice(oldIndex, 1);
            lists.splice(newIndex, 0, movedList);

            return { lists };
          });
        },
        tasks: [],
        addTask: (task) => {
          set((state) => ({
            tasks: [...state.tasks, task],
          }));
        },
        moveTask: (oldListId, newListId, oldIndex, newIndex) => {
          set((state) => {
            const tasks = [...state.tasks];

            const oldListTasks = tasks.filter(
              (task) => task.listId === oldListId
            );
            const movedTask = oldListTasks[oldIndex];

            if (!movedTask) return {};

            tasks.splice(
              tasks.findIndex((t) => t.id === movedTask.id),
              1
            );

            movedTask.listId = newListId;

            const newListTasks = tasks.filter(
              (task) => task.listId === newListId
            );

            newListTasks.splice(newIndex, 0, movedTask);

            const updatedTasks = tasks
              .filter((task) => task.listId !== newListId)
              .concat(newListTasks);

            return { tasks: updatedTasks };
          });
        },
        toggleTaskCompletion: (taskId) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
            ),
          }));
        }
      };
    },
    {
      name: "boardStore",
    }
  )
);
