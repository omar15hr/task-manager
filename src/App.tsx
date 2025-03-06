import { Boards } from "./components/Boards";
import { Sidebar } from "./components/UI/sidebar/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-[#8F3F65]">
      <Sidebar />
      <Boards />
    </div>
  );
}

export default App;
