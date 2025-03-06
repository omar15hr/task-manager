import { BoardContent } from "./BoardContent"
import { BoardHeader } from "./BoardHeader"

export function Boards() {
  return (
    <main className="flex-1 overflow-y-auto">
      <BoardHeader />
      <BoardContent />
    </main>
  )
}