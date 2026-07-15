"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

export function ColumnTitle({
  title,
  onRename,
}: {
  title: string;
  onRename: (title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  function commit() {
    const trimmed = value.trim();
    if (trimmed && trimmed !== title) {
      onRename(trimmed);
    } else {
      setValue(title);
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setValue(title);
            setIsEditing(false);
          }
        }}
        className="h-7 text-sm font-bold text-dark-navy uppercase"
      />
    );
  }

  return (
    <h2
      onClick={() => setIsEditing(true)}
      className="cursor-text truncate text-sm font-bold tracking-wide text-dark-navy uppercase"
    >
      {title}
    </h2>
  );
}
