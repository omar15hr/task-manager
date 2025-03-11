import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Dots, X } from "../Icons";
import { useState } from "react";
import { boardStore } from "@/store/boardStore";

interface ListOptionsPopoverProps {
  listId: string;
}

export function ListOptionsPopover({ listId }: ListOptionsPopoverProps) {
  const [open, setOpen] = useState(false);
  const deleteList = boardStore((state) => state.deleteList);

  const styleButton = `cursor-pointer hover:bg-white/20 w-full text-left p-2 rounded-sm`;
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
          <div className="flex flex-col gap-2 text-sm text-left items-start mt-3">
            {/* <button className={styleButton}>Añadir tarjeta</button>
            <button className={styleButton}>Mover lista</button>
            <button className={styleButton}>Mover todas las tarjetas de esta lista</button>
            <button className={styleButton}>Ordenar por...</button> */}
            <button className={styleButton} onClick={() => deleteList(listId)}>Eliminar lista</button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
