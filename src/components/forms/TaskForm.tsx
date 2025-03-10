import { FormEvent } from "react";
import { X } from "../Icons";
import { boardStore } from "@/store/boardStore";

interface TaskFormProps {
  handleAddTask: () => void;
  listId: string;
}

export function TaskForm({ handleAddTask, listId }: TaskFormProps) {
  const addTask = boardStore((state) => state.addTask);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;

    if (title.trim().length === 0) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      listId,
    };
    addTask(newTask);
    handleAddTask();
    form.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex gap-4 bg-[#101204] text-[#9EACBA] p-2 rounded-md flex-col"
    >
      <input
        type="text"
        name="title"
        placeholder="Introduce el nombre de la lista"
        className="p-2 bg-[#282E33] rounded-sm text-[#8C9BAB]"
      />
      <div className="flex gap-2 items-center">
        <button
          type="submit"
          className="text-black bg-[#5090eb] hover:bg-[#579DFF] p-2 rounded-sm text-sm font-semibold cursor-pointer"
        >
          Añadir tarjeta
        </button>
        <X
          size={30}
          onClickFn={handleAddTask}
          className="hover:bg-white/10 p-1 rounded-sm"
        />
      </div>
    </form>
  );
}
