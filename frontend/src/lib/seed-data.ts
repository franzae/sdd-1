import type { Board } from "@/lib/types";

export const initialBoard: Board = {
  columns: [
    { id: "col-1", title: "Backlog", cardIds: ["card-1", "card-2", "card-3"] },
    { id: "col-2", title: "To Do", cardIds: ["card-4", "card-5"] },
    { id: "col-3", title: "In Progress", cardIds: ["card-6", "card-7"] },
    { id: "col-4", title: "In Review", cardIds: ["card-8"] },
    { id: "col-5", title: "Done", cardIds: ["card-9", "card-10"] },
  ],
  cardsById: {
    "card-1": {
      id: "card-1",
      title: "Define MVP scope",
      details: "Agree on the fixed feature set for the first release.",
    },
    "card-2": {
      id: "card-2",
      title: "Research competitor tools",
      details: "Survey a handful of existing Kanban apps for UX ideas.",
    },
    "card-3": {
      id: "card-3",
      title: "Draft color palette",
      details: "Pick accent, primary, and text colors for the design system.",
    },
    "card-4": {
      id: "card-4",
      title: "Set up project repo",
      details: "Initialize the Next.js app and push the first commit.",
    },
    "card-5": {
      id: "card-5",
      title: "Wireframe the board layout",
      details: "Sketch column widths and card spacing before building.",
    },
    "card-6": {
      id: "card-6",
      title: "Build drag-and-drop",
      details: "Wire up card reordering and cross-column moves.",
    },
    "card-7": {
      id: "card-7",
      title: "Style the card component",
      details: "Match the card visuals to the approved design.",
    },
    "card-8": {
      id: "card-8",
      title: "Review inline editing UX",
      details: "Get feedback on the click-to-edit column title flow.",
    },
    "card-9": {
      id: "card-9",
      title: "Approve project brief",
      details: "Sign off on the initial requirements document.",
    },
    "card-10": {
      id: "card-10",
      title: "Choose tech stack",
      details: "Settle on Next.js, Tailwind, and dnd-kit.",
    },
  },
};
