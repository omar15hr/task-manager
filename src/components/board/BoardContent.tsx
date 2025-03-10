import { boardStore } from "@/store/boardStore";
import { ListContainer } from "../list/ListContainer";

export function BoardContent() {
  const lists = boardStore((state) => state.lists);
  return (
    <div className="flex gap-5 p-5">
      {lists.map((list) => (
        <ListContainer key={list.id} list={list} />
      ))}
    </div>
  );
}
