import { useContext } from "react";
import { Boards } from "./components/board/Boards";
import { Sidebar } from "./components/sidebar/Sidebar";
import { BoardContext, BoardProvider } from "./store/BoardProvider";

function App() {
  const { boards } = useContext(BoardContext);
  return (
    <div className="flex h-screen bg-[#8F3F65]">
      <BoardProvider>
        <Sidebar boards={boards} />
        <Boards />
      </BoardProvider>
    </div>
  );
}

export default App;
