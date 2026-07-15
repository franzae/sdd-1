"use client";

import { useReducer, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { Board } from "@/lib/types";
import { boardReducer } from "@/lib/board-reducer";
import { Column } from "@/components/column";
import { Card } from "@/components/card";

export function KanbanBoard({ initialBoard }: { initialBoard: Board }) {
  const [board, dispatch] = useReducer(boardReducer, initialBoard);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveCardId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCardId(null);
    if (!over) return;

    const cardId = active.id as string;
    const overId = over.id as string;
    if (cardId === overId) return;

    const overColumn = board.columns.find((column) => column.id === overId);
    if (overColumn) {
      dispatch({
        type: "MOVE_CARD",
        cardId,
        toColumnId: overColumn.id,
        toIndex: overColumn.cardIds.length,
      });
      return;
    }

    const destColumn = board.columns.find((column) =>
      column.cardIds.includes(overId),
    );
    if (!destColumn) return;

    dispatch({
      type: "MOVE_CARD",
      cardId,
      toColumnId: destColumn.id,
      toIndex: destColumn.cardIds.indexOf(overId),
    });
  }

  const activeCard = activeCardId ? board.cardsById[activeCardId] : null;

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-8">
      <h1 className="mb-6 text-2xl font-bold text-dark-navy">
        Project Board
      </h1>
      <DndContext
        id="kanban-board"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              board={board}
              onRenameColumn={(columnId, title) =>
                dispatch({ type: "RENAME_COLUMN", columnId, title })
              }
              onAddCard={(columnId, title, details) =>
                dispatch({ type: "ADD_CARD", columnId, title, details })
              }
              onDeleteCard={(cardId) =>
                dispatch({ type: "DELETE_CARD", cardId })
              }
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <div className="w-72">
              <Card card={activeCard} onDelete={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
