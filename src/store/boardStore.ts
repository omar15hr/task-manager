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
  moveList: (oldIndex: number, newIndex: number) => void;
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (
    oldListId: string,
    newListId: string,
    oldIndex: number,
    newIndex: number
  ) => void;
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

            // Encontrar todas las tareas de la lista de origen
            const oldListTasks = tasks.filter(
              (task) => task.listId === oldListId
            );
            const movedTask = oldListTasks[oldIndex]; // Obtener el task a mover

            if (!movedTask) return {}; // Si no se encuentra, salir

            // Remover el task del array original
            tasks.splice(
              tasks.findIndex((t) => t.id === movedTask.id),
              1
            );

            // Actualizar el listId si cambió de lista
            movedTask.listId = newListId;

            // Encontrar todas las tareas de la nueva lista después de mover
            const newListTasks = tasks.filter(
              (task) => task.listId === newListId
            );

            // Insertar el task en la nueva posición dentro de la nueva lista
            newListTasks.splice(newIndex, 0, movedTask);

            // Recalcular las posiciones de los tasks dentro de la lista destino
            const updatedTasks = tasks
              .filter((task) => task.listId !== newListId) // Excluir las de la nueva lista
              .concat(newListTasks); // Agregar la lista con las tareas ordenadas

            return { tasks: updatedTasks };
          });
        },
      };
    },
    {
      name: "boardStore",
    }
  )
);
