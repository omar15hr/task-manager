import { boardStore } from "@/store/boardStore";
import { useState } from "react";

const BACKGROUNDS = [
  { id: 1, background: "#8F3F65" },
  { id: 2, background: "#352A57" },
  { id: 3, background: "#4C2E5D" },
  { id: 4, background: "#24798A" },
  { id: 5, background: "#10549A" },
  { id: 6, background: "#4C2E1F" },
  { id: 7, background: "#A24226" },
  { id: 8, background: "#F2B705" },
  { id: 9, background: "#AC6C2A" },
  { id: 10, background: "#396A28" },
];

interface BoardFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BoardForm({ setOpen }: BoardFormProps) {
  const [hasError, setHasError] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const addBoard = boardStore((state) => state.addBoard);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;

    if (title.trim().length === 0) {
      setHasError(true);
      return;
    }

    const background =
      selectedBackground?.length === 0 ? "#8F3F65" : selectedBackground;

    const newBoard = {
      id: crypto.randomUUID(),
      title,
      background,
    };

    addBoard(newBoard);
    setHasError(true);
    setOpen(false);
    form.reset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim().length > 0) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2 mt-5"
    >
      <div className="flex flex-col gap-2">
        <label className="self-start text-xs font-bold mt-2">Fondo</label>
        <div className="flex flex-wrap gap-2 justify-center">
          {BACKGROUNDS.map((bg) => (
            <div key={bg.id} className="flex flex-row gap-2 items-center">
              <span
                onClick={() => setSelectedBackground(bg.background)}
                style={{ background: bg.background }}
                className={`w-10 h-10 rounded-md cursor-pointer hover:opacity-80 ${
                  selectedBackground === bg.background
                    ? "border-2 border-blue-500"
                    : ""
                }`}
              ></span>
            </div>
          ))}
        </div>
      </div>

      <label htmlFor="title" className="self-start text-xs mt-5 font-bold">
        Título del tablero <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="title"
        className={`w-full border-2 p-1 text-sm rounded-sm ${
          hasError ? "border-red-500" : "border-blue-500"
        } focus:border-blue-500`}
        autoFocus
        onChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={hasError}
        className={`text-sm mt-5 w-full bg-[#343c42] hover:bg-[#444f57] p-2 rounded-sm ${
          hasError ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        Crear
      </button>
    </form>
  );
}
