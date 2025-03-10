import { useContext, useState } from "react";
import { Boards } from "./components/board/Boards";
import { Sidebar } from "./components/sidebar/Sidebar";
import { BoardContext, BoardProvider } from "./store/BoardProvider";
import { Board } from "./types";

function App() {
  const { boards } = useContext(BoardContext);
  const [boardSelected, setBoardSelected] = useState<Board | null>(null);
  console.log(boards)
  return (
    <div className="flex h-screen bg-[#8F3F65]">
      <BoardProvider>
        <Sidebar boards={boards} boardSelected={setBoardSelected} />
        <Boards />
      </BoardProvider>
    </div>
  );
}

export default App;
