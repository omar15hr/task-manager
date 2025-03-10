import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Task, List, Id, Board } from "../types";

interface State {
  boards: Board[];
  lists: List[];
  tasks: Task[];

  setBoards: Dispatch<SetStateAction<Board[]>>;
  setLists: Dispatch<SetStateAction<List[]>>;
  setTasks: Dispatch<SetStateAction<Task[]>>;

  addBoard: (Board: Board) => void;
  addList: (List: List) => void;
  addTask: (Task: Task) => void;

  editListTitle: (title: string, id: Id) => void;
  deleteTask: (TaskId: Id) => void;
  addTaskImage: (newImage: string, TaskId: Id) => void;
  editTaskTitle: (newTitle: string, TaskId: Id) => void;
  editTaskDescription: (newDescription: string, TaskId: Id) => void;
  editTaskIsCover: (newState: boolean, TaskId: Id) => void;
}

const getStorage = () => {
  const storage = localStorage.getItem("Board");
  if (storage) {
    const { lists, tasks, boards } = JSON.parse(storage);
    return { lists, tasks, boards };
  }
  return { lists: [], tasks: [], boards: [] };
};

export const BoardContext = React.createContext<State>({
  boards: [],
  lists: [],
  tasks: [],
  setBoards: () => { },
  setLists: () => { },
  addBoard: () => { },
  setTasks: () => { },
  addList: () => { },
  editListTitle: () => { },
  addTask: () => { },
  deleteTask: () => { },
  addTaskImage: () => { },
  editTaskTitle: () => { },
  editTaskDescription: () => { },
  editTaskIsCover: () => { },
});

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [boards, setBoards] = useState<Board[]>(getStorage().boards);
  const [lists, setLists] = useState<List[]>(getStorage().lists);
  const [tasks, setTasks] = useState<Task[]>(getStorage().tasks);

  const addBoard = (Board: Board) => setBoards((prev) => [...prev, Board]);

  const addList = (List: List) => setLists((prev) => [...prev, List]);
  const editListTitle = (title: string, id: Id) =>
    setLists((prev) =>
      prev.map((col) => (col.id === id ? { ...col, title } : col))
    );
  const addTask = (Task: Task) => setTasks((prev) => [Task, ...prev]);
  const deleteTask = (TaskId: Id) =>
    setTasks((prev) => prev.filter((Task) => Task.id !== TaskId));
  const addTaskImage = (newImage: string, TaskId: Id) =>
    setTasks((prev) =>
      prev.map((Task) =>
        Task.id === TaskId ? { ...Task, srcImage: newImage } : Task
      )
    );
  const editTaskTitle = (newTitle: string, TaskId: Id) =>
    setTasks((prev) =>
      prev.map((Task) =>
        Task.id === TaskId ? { ...Task, title: newTitle } : Task
      )
    );
  const editTaskDescription = (newDescription: string, TaskId: Id) =>
    setTasks((prev) =>
      prev.map((Task) =>
        Task.id === TaskId ? { ...Task, description: newDescription } : Task
      )
    );
  const editTaskIsCover = (newState: boolean, TaskId: Id) =>
    setTasks((prev) =>
      prev.map((Task) =>
        Task.id === TaskId ? { ...Task, imageCovered: newState } : Task
      )
    );

  useEffect(() => {
    const storage = {
      lists,
      tasks,
    };
    localStorage.setItem("Board", JSON.stringify(storage));
  }, [lists, tasks]);

  return (
    <BoardContext.Provider
      value={{
        lists,
        tasks,
        boards, 
        setBoards,
        addBoard,
        setLists,
        setTasks,
        addList,
        editListTitle,
        addTask,
        deleteTask,
        addTaskImage,
        editTaskTitle,
        editTaskDescription,
        editTaskIsCover,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
