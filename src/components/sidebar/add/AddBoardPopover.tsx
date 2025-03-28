import { Plus, X } from "@/components/Icons";
import { Popover, PopoverContent, PopoverTrigger } from '../../UI/Popover';

import { useState } from "react";
import { BoardForm } from "@/components/forms/BoardForm";

export function AddBoardPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Plus size={24} className="hover:bg-[#64656d]" />
      </PopoverTrigger>
      <PopoverContent className="bg-[#282e33] border-none text-[#9EACBA]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <span className="text-sm">Crear tablero</span>
            <div className="flex-1 flex justify-end">
              <X size={18} onClickFn={() => setOpen(false)} />
            </div>
          </div>
          <BoardForm setOpen={setOpen} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
