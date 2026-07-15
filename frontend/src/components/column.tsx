"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Board, Column as ColumnType } from "@/lib/types";
import { Card } from "@/components/card";
import { ColumnTitle } from "@/components/column-title";
import { AddCardForm } from "@/components/add-card-form";

export function Column({
  column,
  board,
  onRenameColumn,
  onAddCard,
  onDeleteCard,
}: {
  column: ColumnType;
  board: Board;
  onRenameColumn: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
}) {
  const cards = column.cardIds.map((id) => board.cardsById[id]);
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      data-testid={`column-${column.id}`}
      className={`flex w-72 shrink-0 flex-col rounded-xl border-t-4 border-accent-yellow bg-slate-50 shadow-sm transition-shadow ${
        isOver ? "ring-2 ring-accent-yellow" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
        <ColumnTitle
          title={column.title}
          onRename={(title) => onRenameColumn(column.id, title)}
        />
        <span className="shrink-0 text-xs font-medium text-gray-text">
          {cards.length}
        </span>
      </div>
      <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex min-h-8 flex-col gap-2 px-3 pb-3">
          {cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </div>
      </SortableContext>
      <div className="px-3 pb-3">
        <AddCardForm
          onAdd={(title, details) => onAddCard(column.id, title, details)}
        />
      </div>
    </div>
  );
}
