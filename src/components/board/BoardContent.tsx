import { List } from "../list/List";

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
  {
    id: 3,
    title: "List 3",
    boardId: 1,
  },
  {
    id: 4,
    title: "List 4",
    boardId: 1,
  },
];

export function BoardContent() {
  return (
    <div className="flex gap-5 p-5">
      {INITIAL_LISTS.map((list) => (
        <List {...list} />
      ))}
    </div>
  );
}
