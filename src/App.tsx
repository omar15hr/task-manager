import { Boards } from "./components/board/Boards";
import { Sidebar } from "./components/sidebar/Sidebar";
import { boardStore } from "./store/boardStore";

function App() {
  const selectedBoard = boardStore((state) => state.selectedBoard);

  const bg = selectedBoard?.background || "#8F3F65";
  return (
    <div className="flex h-screen" style={{ background: bg }}>
      <Sidebar />
      <Boards />
    </div>
  );
}

export default App;
