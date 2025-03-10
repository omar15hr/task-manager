import { ListContainer } from "../list/ListContainer";
import { List, Task } from "@/types";
import { FormEvent, useContext, useMemo, useState } from "react";
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
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskContainer } from "../task/TaskContainer";
import { Plus, X } from "../Icons";

export function BoardContent() {
  const [activeList, setActiveList] = useState<List | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [renderListForm, setRenderListForm] = useState(false);

  const listsId = []
  const lists = []

  const handleAddList = () => {
    setRenderListForm(!renderListForm);
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
  }

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

    setLists((lists) => {
      const activeListIndex = lists.findIndex((list) => list.id === activeId);
      const overListIndex = lists.findIndex((list) => list.id === overId);

      return arrayMove(lists, activeListIndex, overListIndex);
    });
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
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].listId != tasks[overIndex].listId) {
          tasks[activeIndex].listId = tasks[overIndex].listId;
          console.log(overIndex);
          return arrayMove(
            tasks,
            activeIndex,
            overIndex === 0 ? 0 : overIndex - 1
          );
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";

    if (isActiveATask && isOverAList) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].listId = +overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
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
    <div className="p-2">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={listsId}>
          <div>
            {!renderListForm ? (
              <button
                onClick={handleAddList}
                className="flex gap-1 text-white bg-white/30 hover:bg-white/25 p-2 rounded-md w-70 cursor-pointer"
              >
                <Plus size={24} />
                <span>Añade otra lista</span>
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="w-70 flex gap-4 bg-[#101204] text-[#9EACBA] p-2 rounded-md flex-col">
                <input
                  type="text"
                  name="title"
                  placeholder="Introduce el nombre de la lista"
                  className="p-1 bg-[#282E33] rounded-sm text-[#8C9BAB]"
                />
                <div className="flex gap-2 items-center">
                  <button type="button" className="text-black bg-[#5090eb] hover:bg-[#579DFF] p-2 rounded-sm text-sm font-semibold cursor-pointer">
                    Añadir lista
                  </button>
                  <X size={30} onClickFn={handleAddList} className="hover:bg-white/10 p-1 rounded-sm" />
                </div>
              </form>
            )}
          </div>
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
    </div>
  );
}
