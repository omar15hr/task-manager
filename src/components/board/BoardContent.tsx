import { boardStore } from "@/store/boardStore";
import { ListContainer } from "../list/ListContainer";
import { List, Task } from "@/types";
import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskContainer } from "../task/TaskContainer";

export function BoardContent() {
  const [activeList, setActiveList] = useState<List | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const lists = boardStore((state) => state.lists);
  const tasks = boardStore((state) => state.tasks);
  const moveList = boardStore((state) => state.moveList);
  const moveTask = boardStore((state) => state.moveTask);

  const listsId = useMemo(() => lists.map((list) => list.id), [lists]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.item);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.item);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveList(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAList = active.data.current?.type === "List";
    if (!isActiveAList) return;

    const activeListIndex = lists.findIndex((list) => list.id === activeId);
    const overListIndex = lists.findIndex((list) => list.id === overId);

    moveList(activeListIndex, overListIndex);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (activeIndex === -1 || overIndex === -1) return;

      const activeTask = tasks[activeIndex];
      const overTask = tasks[overIndex];

      if (!activeTask || !overTask) return;

      if (activeTask.listId !== overTask.listId) {
        moveTask(activeIndex, overIndex);
      }
    }

    const isOverAColumn = over.data.current?.type === "List";

    if (isActiveATask && isOverAColumn) {
      moveTask(activeId as number, overId as number);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // 10px
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <SortableContext items={listsId}>
        <div className="flex gap-5 p-5">
          {lists.map((list) => (
            <ListContainer key={list.id} list={list} />
          ))}
        </div>
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {activeList && <ListContainer list={activeList} />}
          {activeTask && <TaskContainer task={activeTask} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
