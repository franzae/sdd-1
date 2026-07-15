"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import type { Card as CardType } from "@/lib/types";

export function Card({
  card,
  onDelete,
}: {
  card: CardType;
  onDelete: (cardId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
      data-testid={`card-${card.id}`}
      {...attributes}
      {...listeners}
      className="group relative rounded-lg border border-black/5 bg-white p-3 shadow-sm"
    >
      <button
        type="button"
        aria-label="Delete card"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(card.id);
        }}
        className="absolute top-2 right-2 rounded p-0.5 text-gray-text opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
      <h3 className="pr-4 text-sm font-semibold text-dark-navy">
        {card.title}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-text">
        {card.details}
      </p>
    </div>
  );
}
