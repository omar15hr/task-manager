import { FormEvent } from "react";
import { X } from "../Icons";
import { boardStore } from "@/store/boardStore";

interface ListFormProps {
  handleAddList: () => void;
}

export function ListForm({ handleAddList }: ListFormProps) {
  const selectedBoard = boardStore((state) => state.selectedBoard);
  const addList = boardStore((state) => state.addList);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;

    if (title.trim().length === 0) return;

    const newList = {
      id: crypto.randomUUID(),
      title,
      boardId: selectedBoard!.id,
    };
    addList(newList);
    handleAddList();
    form.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-70 flex gap-4 bg-[#101204] text-[#9EACBA] p-2 rounded-md flex-col"
    >
      <input
        type="text"
        name="title"
        placeholder="Introduce el nombre de la lista"
        className="p-1 bg-[#282E33] rounded-sm text-[#8C9BAB]"
      />
      <div className="flex gap-2 items-center">
        <button
          type="submit"
          className="text-black bg-[#5090eb] hover:bg-[#579DFF] p-2 rounded-sm text-sm font-semibold cursor-pointer"
        >
          Añadir lista
        </button>
        <X
          size={30}
          onClickFn={handleAddList}
          className="hover:bg-white/10 p-1 rounded-sm"
        />
      </div>
    </form>
  );
}
