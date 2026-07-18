"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { getYoutubeThumbnail } from "@/lib/youtube";
import { toggleVideoPublished, deleteVideo } from "./actions";
import type { Video } from "@/lib/types";

export function VideosList({ videos }: { videos: Video[] }) {
  const [items, setItems] = useState(videos);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle(id: string, next: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await toggleVideoPublished(id, next);
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
    if (!window.confirm("Deze video definitief verwijderen?")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteVideo(id);
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
        <p className="text-ink-500">Nog geen video&apos;s toegevoegd.</p>
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
      {items.map((item) => {
        const thumbnail = getYoutubeThumbnail(item.youtube_url);
        return (
          <Card key={item.id} className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt=""
                  className="h-14 w-24 rounded-md object-cover"
                />
              )}
              <div>
                <h3 className="font-serif text-base font-semibold text-forest-900">
                  {item.titel}
                </h3>
                {item.beschrijving && (
                  <p className="line-clamp-1 text-sm text-ink-500">{item.beschrijving}</p>
                )}
              </div>
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
        );
      })}
    </div>
  );
}
