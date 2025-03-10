import { Plus } from "../Icons";
import { ListOptionsPopover } from "./ListOptionsPopover";
import { TaskContainer } from "../task/TaskContainer";
import { boardStore } from "@/store/boardStore";
import { List } from "@/types";

interface ListProps {
  list: List;
}

export function ListContainer({ list }: ListProps) {
  const { id, title } = list;
  const tasks = boardStore((state) => state.tasks);

  const filteredTasks = tasks.filter(task => task.listId === id);

  return (
    <div key={id}>
      <div className="w-70 bg-[#101204] text-[#9EACBA] p-2 rounded-md flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="p-2 font-bold">{title}</h2>
          <ListOptionsPopover />
        </div>
        <div className="flex flex-col gap-2 mt-2 p-1">
          {filteredTasks.map((task) => (
           <TaskContainer key={task.id} {...task} />
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
