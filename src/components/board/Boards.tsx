import { BoardContent } from "./BoardContent"
import { BoardHeader } from "./BoardHeader"

export function Boards() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <BoardHeader />
      <div className="flex-1 overflow-y-auto">
        <BoardContent />
      </div>
    </main>
  )
}