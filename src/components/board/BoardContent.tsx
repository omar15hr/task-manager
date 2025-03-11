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
import { Plus } from "../Icons";
import { boardStore } from "@/store/boardStore";
import { ListForm } from "../forms/ListForm";

export function BoardContent() {
  const [activeList, setActiveList] = useState<List | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [renderListForm, setRenderListForm] = useState(false);

  const selectedBoard = boardStore((state) => state.selectedBoard);
  const boards = boardStore(state => state.boards);


  const isBoardEmpty = boards.length === 0 ? true : false;

  const tasks = boardStore((state) => state.tasks);
  const moveTask = boardStore((state) => state.moveTask);

  const lists = boardStore((state) => state.lists);
  const moveList = boardStore((state) => state.moveList);



  const filteredLists = useMemo(() => {
    return lists.filter((list) => list.boardId === selectedBoard?.id);
  }, [lists, selectedBoard]);

  const listsId = useMemo(
    () => filteredLists.map((list) => list.id),
    [filteredLists]
  );


  const handleAddList = () => {
    setRenderListForm(!renderListForm);
  };

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

    const oldIndex = lists.findIndex((list) => list.id === activeId);
    const newIndex = lists.findIndex((list) => list.id === overId);

    console.log(oldIndex, newIndex);

    if (oldIndex === -1 || newIndex === -1) return;

    moveList(oldIndex, newIndex);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    const isOverAList = over.data.current?.type === "List";

    if (!isActiveATask) return;

    const oldListId = active.data.current?.item.listId;

    if (isOverATask) {
      const newListId = over.data.current?.item.listId;

      const oldIndex = tasks
        .filter((task) => task.listId === oldListId)
        .findIndex((task) => task.id === activeId);

      const newIndex = tasks
        .filter((task) => task.listId === newListId)
        .findIndex((task) => task.id === overId);

      moveTask(oldListId, newListId, oldIndex, newIndex);
    }

    if (isOverAList) {
      const newListId = over.data.current?.item.id;

      const oldIndex = tasks
        .filter((task) => task.listId === oldListId)
        .findIndex((task) => task.id === activeId);

      moveTask(oldListId, newListId, oldIndex, 0);
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
              disabled={isBoardEmpty}
                onClick={handleAddList}
                className={`flex gap-1 text-white bg-white/30 hover:bg-white/25 p-2 rounded-md w-70 cursor-pointer ${
                  isBoardEmpty ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
              >
                <Plus size={24} />
                <span  >Añade otra lista</span>
              </button>
            ) : (
              <ListForm handleAddList={handleAddList} />
            )}
          </div>
          <div className="flex gap-5 p-5">
            {filteredLists.map((list) => (
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
