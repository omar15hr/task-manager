import { Plus } from "../Icons";
import { ListOptionsPopover } from "./ListOptionsPopover";
import { TaskContainer } from "../task/TaskContainer";
import { List } from "@/types";
import { useSortableConf } from "@/hooks/useSortableConf";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { boardStore } from "@/store/boardStore";
import { TaskForm } from "../forms/TaskForm";

interface ListProps {
  list: List;
}

export function ListContainer({ list }: ListProps) {
  const { id, title } = list;
  const [renderTaskForm, setRenderTaskForm] = useState(false);

  const tasks = boardStore((state) => state.tasks);

  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.listId === list.id),
    [tasks, list.id]
  );

  const handleAddTask = () => {
    setRenderTaskForm(!renderTaskForm);
  };

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf({
      type: "List",
      item: list,
    });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/20 opacity-40 w-[280px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div key={id} ref={setNodeRef} style={style}>
      <div className="w-70 bg-[#101204] text-[#9EACBA] p-2 rounded-md flex flex-col">
        <div className="flex justify-between items-center">
          <h3
            className="p-2 text-sm font-bold cursor-pointer w-full"
            {...attributes}
            {...listeners}
          >
            {title}
          </h3>
          <ListOptionsPopover />
        </div>
        <div className="flex flex-col gap-2 mt-2 p-1">
          <SortableContext items={filteredTasks.map((task) => task.id)}>
            {filteredTasks.map((task) => (
              <TaskContainer key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
        {!renderTaskForm ? (
          <button
            onClick={handleAddTask}
            className="flex gap-1 items-center p-2 mt-2 hover:bg-gray-700/70 rounded-md cursor-pointer"
          >
            <Plus size={24} />
            <span className="text-sm font-bold">Añade una tarjeta</span>
          </button>
        ) : (
          <TaskForm listId={list.id} handleAddTask={handleAddTask} />
        )}
      </div>
    </div>
  );
}
