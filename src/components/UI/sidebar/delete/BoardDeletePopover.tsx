import { Dots, X } from "@/components/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { useState } from "react";
import { BoardDeleteDropdownMenu } from "./BoardDeleteDropdownMenu";

export function BoardDeletePopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Dots size={24} />
      </PopoverTrigger>
      <PopoverContent className="bg-[#282e33] border-none text-[#9EACBA]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <span className="text-sm">Nombre del tablero</span>
            <div className="flex-1 flex justify-end">
              <X size={18} onClickFn={() => setOpen(false)} />
            </div>
          </div>
          <BoardDeleteDropdownMenu />
        </div>
      </PopoverContent>
    </Popover>
  );
}
