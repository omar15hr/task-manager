import { useState } from "react";
import { Dots, Plus, ThreePoints, Toggle, X } from "../Icons";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/Dropmenu";

const BOARDS = [
  {
    id: 1,
    background: "#8F3F65",
    title: "Trello",
  },
  {
    id: 2,
    background: "#352A57",
    title: "Trello",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedBoard] = useState(BOARDS[0]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-[#221D24]/95 text-[#9EACBA] transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex gap-1 items-center">
            <ThreePoints size={24} />
            <span className="text-xl font-semibold">Task Manager</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-2 focus:outline-none">
          {collapsed ? <Toggle size={24} /> : <X size={24} />}
        </button>
      </div>
      <hr
        className={!collapsed ? "border-[#2e2d2e] border-1 w-full" : "hidden"}
      />
      <nav className={!collapsed ? "border-[#2e2d2e] w-full p-3" : "hidden"}>
        <div className="flex justify-between mb-4">
          <span className="font-bold">Sus tableros</span>
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger>
                <Dots size={24} />
              </PopoverTrigger>
              <PopoverContent className="bg-[#282e33] border-none text-[#9EACBA]">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex-1"></div>
                    <span className="text-sm">Sus tableros</span>
                    <div className="flex-1 flex justify-end">
                      <X size={18} />
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </PopoverContent>
            </Popover>

            <Plus size={24} />
          </div>
        </div>

        <ul className="flex flex-col gap-1">
          {BOARDS.map((board) => (
            <li>
              <div
                className={`flex gap-3 rounded-md items-center cursor-pointer p-2 hover:bg-[#3F4046] 
                ${selectedBoard.id === board.id ? "bg-[#64656d]" : ""} `}
                key={board.id}
              >
                <div
                  style={{ background: board.background }}
                  className="w-6 h-6"
                ></div>
                <span className="text-sm">{board.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
