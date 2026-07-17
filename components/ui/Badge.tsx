import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "forest",
}: {
  children: ReactNode;
  tone?: "forest" | "amber" | "ink";
}) {
  const tones = {
    forest: "bg-forest-50 text-forest-700",
    amber: "bg-amber-50 text-amber-700",
    ink: "bg-ink-100 text-ink-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
