"use client";

import { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PROFESSION_LABELS, type ProfessionCategory } from "@/lib/types";
import { approveApplication, rejectApplication } from "./actions";

interface Application {
  id: string;
  voornaam: string;
  achternaam: string;
  beroep: string;
  organisatie: string | null;
  plaats: string | null;
  provincie: string | null;
  land: string | null;
  email: string;
  telefoonnummer: string | null;
  motivatie: string | null;
  status: string;
  aangemaakt_op: string;
}

const PAGE_SIZE = 20;

export function AanmeldingenList({ applications }: { applications: Application[] }) {
  const [items, setItems] = useState(applications);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageItems = items.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

  function handleApprove(id: string) {
    setError(null);
    setBusyId(id);
    startTransition(async () => {
      const result = await approveApplication(id);
      if (result.error) {
        setError(result.error);
      } else {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
      setBusyId(null);
    });
  }

  function handleReject(id: string) {
    setError(null);
    setBusyId(id);
    startTransition(async () => {
      const result = await rejectApplication(id);
      if (result.error) {
        setError(result.error);
      } else {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
      setBusyId(null);
    });
  }

  if (items.length === 0) {
    return (
      <Card>
        <p className="text-ink-500">Geen openstaande aanmeldingen. 🎉</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      {items.length > PAGE_SIZE && (
        <p className="text-sm text-ink-500">
          {items.length} openstaande aanmeldingen — pagina {currentPage + 1} van {pageCount}
        </p>
      )}
      {pageItems.map((item) => (
        <Card key={item.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-serif text-lg font-semibold text-forest-900">
                  {item.voornaam} {item.achternaam}
                </h3>
                <Badge>
                  {PROFESSION_LABELS[item.beroep as ProfessionCategory] ?? item.beroep}
                </Badge>
              </div>
              <p className="text-sm text-ink-500">
                {item.organisatie ? `${item.organisatie} — ` : ""}
                {item.plaats}
                {item.provincie ? `, ${item.provincie}` : ""}
                {item.land === "BE" ? " (België)" : ""}
              </p>
              <p className="mt-1 text-sm text-ink-700">
                {item.email}
                {item.telefoonnummer ? ` · ${item.telefoonnummer}` : ""}
              </p>
              {item.motivatie && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700">
                  {item.motivatie}
                </p>
              )}
              <p className="mt-2 text-xs text-ink-500">
                Aangemeld op{" "}
                {new Date(item.aangemaakt_op).toLocaleDateString("nl-NL")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pending && busyId === item.id}
                onClick={() => handleReject(item.id)}
              >
                Afwijzen
              </Button>
              <Button
                size="sm"
                disabled={pending && busyId === item.id}
                onClick={() => handleApprove(item.id)}
              >
                Goedkeuren
              </Button>
            </div>
          </div>
        </Card>
      ))}
      {pageCount > 1 && (
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Vorige
          </Button>
          <span className="text-sm text-ink-500">
            Pagina {currentPage + 1} van {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          >
            Volgende
          </Button>
        </div>
      )}
    </div>
  );
}
