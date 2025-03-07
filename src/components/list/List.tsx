import { Plus } from "../Icons";
import { ListOptionsPopover } from "../list/ListOptionsPopover";
import { Task } from "../task/Task";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Task 1",
    listId: 1,
  },
  {
    id: 2,
    title: "Task 2",
    listId: 1,
  },
  {
    id: 3,
    title: "Task 3",
    listId: 1,
  },
  {
    id: 4,
    title: "Task 4",
    listId: 2,
  },
  {
    id: 5,
    title: "Task 5",
    listId: 1,
  },
  {
    id: 6,
    title: "Task 6",
    listId: 3,
  },
  {
    id: 7,
    title: "Task 7",
    listId: 3,
  },
  {
    id: 8,
    title: "Task 8",
    listId: 3,
  },
  {
    id: 9,
    title: "Task 9",
    listId: 1,
  },
  {
    id: 10,
    title: "Task 10",
    listId: 1,
  },
];

interface ListProps {
  id: number;
  title: string;
  boardId: number;
}

export function List({ id, title }: ListProps) {
  return (
    <div key={id}>
      <div className="w-70 bg-[#101204] text-[#9EACBA] p-2 rounded-md flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="p-2 font-bold">{title}</h2>
          <ListOptionsPopover />
        </div>
        <div className="flex flex-col gap-2 mt-2 p-1">
          {INITIAL_TASKS.filter((task) => task.listId === id).map((task) => (
           <Task {...task} />
          ))}
        </div>
        <div className="flex gap-1 items-center p-2 mt-2 hover:bg-gray-700/70 rounded-md cursor-pointer">
          <Plus size={24} />
          <span className="text-sm font-bold">Añade una tarjeta</span>
        </div>
      </div>
    </div>
  );
}
