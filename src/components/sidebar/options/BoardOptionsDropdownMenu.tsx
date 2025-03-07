import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../../UI/Dropmenu';
import { ChevronDown } from '../../Icons';
import { useState } from "react";

export function BoardOptionsDropdownMenu() {
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 mt-5 items-center justify-between cursor-pointer border-2 border-[#282e33] hover:border-[#9EACBA] p-2 rounded-sm ease-in-out duration-300">
          <span className="text-sm">Ordenar tableros</span>
          <ChevronDown size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#282e33] border-none text-[#9EACBA]">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">
            Ordenar alfabéticamente
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">
            Ordenar de más a menos reciente
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
