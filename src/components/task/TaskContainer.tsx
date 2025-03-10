import { useState } from "react";
import { Circle, CircleCheck } from "../Icons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../UI/HoverCard";
import { Task } from "@/types";

interface TaskProps {
  task: Task;
}

export function TaskContainer({ task }: TaskProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div
      key={task.id}
      className="group flex gap-3 items-center p-2 rounded-md bg-[#22272B] cursor-pointer text-sm hover:bg-[#2D3338] transition-colors duration-200"
    >
      <div
        onClick={handleComplete}
        className={
          isCompleted
            ? `transition-opacity duration-200 flex items-center justify-center`
            : "opacity-0 group-hover:opacity-100"
        }
      >
        <HoverCard>
          <HoverCardTrigger>
            {!isCompleted ? (
              <Circle size={20} className="hover:text-[#b3c3d3]" />
            ) : (
              <CircleCheck size={20} />
            )}
          </HoverCardTrigger>
          {!isCompleted ? (
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
      <span>{task.title}</span>
    </div>
  );
}
