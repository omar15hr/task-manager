import { Plus } from "../Icons";

const INITIAL_LISTS = [
  {
    id: 1,
    title: "List 1",
    boardId: 1,
  },
  {
    id: 2,
    title: "List 2",
    boardId: 1,
  },
];

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
    listId: 1,
  },
];

export function BoardContent() {
  return (
    <div className="flex gap-5 p-5">
      {INITIAL_LISTS.map((list) => (
        <div
          key={list.id}
          className="w-60 h-auto bg-[#101204] text-[#9EACBA] p-2 rounded-md flex flex-col justify-between"
        >
          <h2 className="p-2 font-bold">{list.title}</h2>
          <div className="flex flex-col gap-2 mt-2 p-1">
            {INITIAL_TASKS.filter((task) => task.listId === list.id).map(
              (task) => (
                <div
                  key={task.id}
                  className="flex gap-3 items-center p-2 rounded-md bg-[#22272B] cursor-pointer text-sm"
                >
                  <span>{task.title}</span>
                </div>
              )
            )}
          </div>
            <div className="flex gap-1 items-center p-1 mt-2 hover:bg-gray-700/70 rounded-md cursor-pointer">
              <Plus size={24} />
              <span className="text-sm font-bold">Añade una tarjeta</span>
            </div>

        </div>
      ))}
    </div>
  );
}
