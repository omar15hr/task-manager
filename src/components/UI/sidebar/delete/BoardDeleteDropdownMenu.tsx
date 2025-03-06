import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../../Dropmenu";
import { ChevronRight } from "../../../Icons";

interface Props {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>
}

export function BoardDeleteDropdownMenu({ isDeleting, setIsDeleting }: Props) {

  const handleDelete = () => {
    setIsDeleting(!isDeleting);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={handleDelete}>
        <div className="flex gap-2 mt-5 items-center justify-between cursor-pointer border-2 border-[#282e33] hover:border-[#9EACBA] p-2 rounded-sm ease-in-out duration-300">
          <span className="text-sm">Cerrar tablero</span>
          <ChevronRight size={18} />
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
