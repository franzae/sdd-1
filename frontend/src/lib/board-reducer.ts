import type { Board } from "@/lib/types";

export type BoardAction =
  | { type: "ADD_CARD"; columnId: string; title: string; details: string }
  | { type: "DELETE_CARD"; cardId: string }
  | { type: "RENAME_COLUMN"; columnId: string; title: string }
  | { type: "MOVE_CARD"; cardId: string; toColumnId: string; toIndex: number };

function findColumnIndexByCardId(board: Board, cardId: string): number {
  return board.columns.findIndex((column) => column.cardIds.includes(cardId));
}

export function boardReducer(board: Board, action: BoardAction): Board {
  switch (action.type) {
    case "ADD_CARD": {
      const id = crypto.randomUUID();
      return {
        ...board,
        cardsById: {
          ...board.cardsById,
          [id]: { id, title: action.title, details: action.details },
        },
        columns: board.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cardIds: [...column.cardIds, id] }
            : column,
        ),
      };
    }

    case "DELETE_CARD": {
      const cardsById = Object.fromEntries(
        Object.entries(board.cardsById).filter(
          ([id]) => id !== action.cardId,
        ),
      );
      return {
        ...board,
        cardsById,
        columns: board.columns.map((column) => ({
          ...column,
          cardIds: column.cardIds.filter((id) => id !== action.cardId),
        })),
      };
    }

    case "RENAME_COLUMN": {
      return {
        ...board,
        columns: board.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, title: action.title }
            : column,
        ),
      };
    }

    case "MOVE_CARD": {
      const fromColumnIndex = findColumnIndexByCardId(board, action.cardId);
      if (fromColumnIndex === -1) return board;

      const columns = board.columns.map((column) => ({
        ...column,
        cardIds: [...column.cardIds],
      }));

      columns[fromColumnIndex].cardIds = columns[
        fromColumnIndex
      ].cardIds.filter((id) => id !== action.cardId);

      const toColumn = columns.find((column) => column.id === action.toColumnId);
      if (!toColumn) return board;

      // Matches dnd-kit's arrayMove convention: action.toIndex is the
      // target's index in the list before removal, and is used as-is to
      // splice into the (now one-shorter) destination list.
      const toIndex = Math.max(
        0,
        Math.min(action.toIndex, toColumn.cardIds.length),
      );
      toColumn.cardIds.splice(toIndex, 0, action.cardId);

      return { ...board, columns };
    }

    default:
      return board;
  }
}
