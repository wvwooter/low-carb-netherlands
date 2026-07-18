"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { togglePublished, deleteArticle } from "./actions";

interface ArticleRow {
  id: string;
  titel: string;
  categorie: string | null;
  auteur: string | null;
  publicatiedatum: string;
  gepubliceerd: boolean;
}

export function ArtikelenList({ articles }: { articles: ArticleRow[] }) {
  const [items, setItems] = useState(articles);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle(id: string, next: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await togglePublished(id, next);
      if (result.error) {
        setError(result.error);
        return;
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, gepubliceerd: next } : item))
      );
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Dit artikel definitief verwijderen?")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteArticle(id);
      if (result.error) {
        setError(result.error);
        return;
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
  }

  if (items.length === 0) {
    return (
      <Card>
        <p className="text-ink-500">
          Nog geen artikelen. Klik hierboven op &quot;Nieuw artikel&quot; om
          er een toe te voegen.
        </p>
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
                {item.titel}
              </h3>
              {item.categorie && <Badge>{item.categorie}</Badge>}
            </div>
            <p className="text-sm text-ink-500">
              {item.auteur ? `${item.auteur} · ` : ""}
              {new Date(item.publicatiedatum).toLocaleDateString("nl-NL")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-ink-700">
              <input
                type="checkbox"
                checked={item.gepubliceerd}
                disabled={pending}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
                className="h-4 w-4 rounded border-ink-300 text-forest-700 focus:ring-forest-300"
              />
              Gepubliceerd
            </label>
            <Link
              href={`/beheer/artikelen/${item.id}/bewerken`}
              className="text-sm font-medium text-forest-800 hover:underline"
            >
              Bewerken
            </Link>
            <button
              type="button"
              disabled={pending}
              onClick={() => handleDelete(item.id)}
              className="text-sm font-medium text-red-700 hover:underline"
            >
              Verwijderen
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
