import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Dots, X } from "../Icons";
import { useState } from "react";

export function ListOptionsPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Dots size={24} className="hover:bg-[#3F4046]" />
      </PopoverTrigger>
      <PopoverContent className="bg-[#282e33] border-none text-[#9EACBA]">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <span className="text-sm">Acciones</span>
            <div className="flex-1 flex justify-end">
              <X size={18} onClickFn={() => setOpen(false)} />
            </div>
          </div>
          <hr className="border-[#3c4146] border-1 w-full" />
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur, eos.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
