import { useState } from "react";
import { ThreePoints, Toggle, X } from "../Icons";
import { BoardOptionsPopover } from "./options/BoardOptionsPopover";
import { AddBoardPopover } from "./add/AddBoardPopover";
import { BoardDeletePopover } from "./delete/BoardDeletePopover";
import { Board } from "@/types";
import { boardStore } from "@/store/boardStore";



export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedBoard = boardStore( state => state.selectedBoard );
  const boards = boardStore( state => state.boards );
  const setBoardSelected = boardStore( state => state.setBoardSelected );

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSelectBoard = (board: Board) => {
    setBoardSelected(board);
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
            <BoardOptionsPopover />
            <AddBoardPopover />
          </div>
        </div>

        <ul className="flex flex-col gap-1">
          {boards.map((board) => (
            <li
              className={`flex justify-between gap-3 rounded-md items-center cursor-pointer p-2 hover:bg-[#3F4046] 
              ${selectedBoard?.id === board.id ? "bg-[#64656d]" : ""} `}
              key={board.id}
              onClick={() => handleSelectBoard(board)}
            >
              <div className="flex gap-2 items-center">
                <div
                  style={{ background: board.background }}
                  className="min-w-6 h-6"
                ></div>
                <span className="text-sm">{board.title}</span>
              </div>
              <BoardDeletePopover
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
