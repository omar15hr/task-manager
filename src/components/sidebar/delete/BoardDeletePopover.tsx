import { ChevronLeft, Dots, X } from "@/components/Icons";
import { Popover, PopoverContent, PopoverTrigger } from '../../UI/Popover';
import { useState } from "react";
import { BoardDeleteDropdownMenu } from "./BoardDeleteDropdownMenu";

interface Props {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BoardDeletePopover({ isDeleting, setIsDeleting }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleting(!isDeleting);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Dots size={24} className="hover:bg-[#64656d]" />
      </PopoverTrigger>
      <PopoverContent className="bg-[#282e33] border-none text-[#9EACBA]">
        {!isDeleting ? (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex-1"></div>
              <span className="text-sm">Nombre del tablero</span>
              <div className="flex-1 flex justify-end">
                <X size={18} onClickFn={() => setOpen(false)} />
              </div>
            </div>
            <BoardDeleteDropdownMenu
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex">
                <ChevronLeft size={18} onClickFn={handleDelete} />
              </div>
              <span className="text-sm flex">¿Desea cerrar el tablero?</span>
              <div className="flex">
                <X size={18} onClickFn={() => setOpen(false)} />
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="bg-[#d4635b] hover:bg-[#f87168] rounded-sm p-1 mt-5 text-black cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
