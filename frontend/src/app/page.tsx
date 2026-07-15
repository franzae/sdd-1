import { KanbanBoard } from "@/components/kanban-board";
import { initialBoard } from "@/lib/seed-data";

export default function Home() {
  return <KanbanBoard initialBoard={initialBoard} />;
}
