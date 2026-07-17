"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PROFESSION_LABELS, type ProfessionCategory } from "@/lib/types";
import { toggleVisibility } from "./actions";

interface ProfessionalRow {
  id: string;
  naam: string;
  beroep: string;
  locatie: string;
  provincie: string;
  email: string;
  goedkeuringsstatus: string;
  zichtbaar: boolean;
}

export function ProfessionalsList({ professionals }: { professionals: ProfessionalRow[] }) {
  const [items, setItems] = useState(professionals);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle(id: string, next: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await toggleVisibility(id, next);
      if (result.error) {
        setError(result.error);
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, zichtbaar: next } : item))
      );
    });
  }

  if (items.length === 0) {
    return (
      <Card>
        <p className="text-ink-500">Nog geen professionals in de gids.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      {items.map((item) => (
        <Card key={item.id} className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="font-serif text-base font-semibold text-forest-900">
                {item.naam}
              </h3>
              <Badge>
                {PROFESSION_LABELS[item.beroep as ProfessionCategory] ?? item.beroep}
              </Badge>
              <Badge tone={item.goedkeuringsstatus === "approved" ? "forest" : "amber"}>
                {item.goedkeuringsstatus}
              </Badge>
            </div>
            <p className="text-sm text-ink-500">
              {item.locatie}, {item.provincie} · {item.email}
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
            <input
              type="checkbox"
              checked={item.zichtbaar}
              disabled={pending}
              onChange={(e) => handleToggle(item.id, e.target.checked)}
              className="h-4 w-4 rounded border-ink-300 text-forest-700 focus:ring-forest-300"
            />
            Zichtbaar op site
          </label>
        </Card>
      ))}
    </div>
  );
}
