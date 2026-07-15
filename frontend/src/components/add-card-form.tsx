"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddCardForm({
  onAdd,
}: {
  onAdd: (title: string, details: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function reset() {
    setTitle("");
    setDetails("");
    setIsOpen(false);
  }

  function submit() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      reset();
      return;
    }
    onAdd(trimmedTitle, details.trim());
    reset();
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full rounded-md py-1.5 text-left text-xs font-medium text-blue-primary hover:bg-black/5"
      >
        + Add card
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-black/5 bg-white p-2 shadow-sm">
      <Input
        autoFocus
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          if (e.key === "Escape") reset();
        }}
        className="text-sm"
      />
      <textarea
        placeholder="Details (optional)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") reset();
        }}
        rows={2}
        className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          Cancel
        </Button>
        <Button type="button" size="sm" onClick={submit}>
          Add card
        </Button>
      </div>
    </div>
  );
}
