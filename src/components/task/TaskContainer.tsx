import { Circle, CircleCheck, Trash } from "../Icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../UI/HoverCard";
import { Task } from "@/types";
import { useSortableConf } from "@/hooks/useSortableConf";
import { boardStore } from "@/store/boardStore";
import { GripVertical } from "lucide-react";

interface TaskProps {
  task: Task;
}

export function TaskContainer({ task }: TaskProps) {
  const toggleTaskCompletion = boardStore(
    (state) => state.toggleTaskCompletion
  );

  const deleteTask = boardStore(state => state.deleteTask);

  const handleComplete = (taskId: string) => {
    toggleTaskCompletion(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  }

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf({
      type: "Task",
      item: task,
    });

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`h-12 w-full opacity-50 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md`}
      />
    );
  }

  return (
    <div
      key={task.id}
      ref={setNodeRef}
      style={style}
      className="group flex gap-3 items-center p-2 rounded-md bg-[#22272B] cursor-pointer text-sm hover:bg-[#2D3338] transition-colors duration-200"
    >
      <div className="flex w-full justify-between">
        <div className="flex gap-2 items-center flex-wrap">
          <div
            onClick={() => handleComplete(task.id)}
            className={
              task.isCompleted
                ? `transition-opacity duration-200 flex items-center justify-center`
                : "opacity-0 group-hover:opacity-100"
            }
          >
            <HoverCard>
              <HoverCardTrigger>
                {!task.isCompleted ? (
                  <Circle size={24} className="hover:text-[#b3c3d3] hover:scale-105 transition" />
                ) : (
                  <CircleCheck size={24} className="hover:scale-105 transition" />
                )}
              </HoverCardTrigger>
              {!task.isCompleted ? (
                <HoverCardContent className="bg-[#455058] text-[#b5c6d6] border-none text-xs w-45 h-10 flex items-center">
                  Marcar como completada
                </HoverCardContent>
              ) : (
                <HoverCardContent className="bg-[#455058] text-[#b5c6d6] border-none text-xs w-50 h-10 flex items-center">
                  Desmarcar como completada
                </HoverCardContent>
              )}
            </HoverCard>
          </div>
          <span className="overflow-wrap break-words max-w-full">{task.title}</span>
        </div>
        <div className="flex gap-2 items-center">
          <GripVertical {...attributes} {...listeners} className="hover:text-white/40" />
          <Trash size={24} className="hover:text-white/40 cursor-pointer" onClickFn={() => handleDeleteTask(task.id)} />
        </div>
      </div>
    </div>
  );
}
