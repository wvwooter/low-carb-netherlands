import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-shadow hover:shadow-cardHover ${className}`}
    >
      {children}
    </div>
  );
}
