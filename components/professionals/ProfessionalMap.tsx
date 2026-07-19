"use client";

import dynamic from "next/dynamic";

const ProfessionalMapInner = dynamic(
  () => import("./ProfessionalMapInner").then((m) => m.ProfessionalMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-sm text-ink-500">
        Kaart wordt geladen…
      </div>
    ),
  }
);

export function ProfessionalMap(props: {
  latitude: number;
  longitude: number;
  naam: string;
  locatie: string;
  provincie: string;
}) {
  return (
    <div className="h-[280px] w-full overflow-hidden rounded-2xl border border-ink-100 shadow-card">
      <ProfessionalMapInner {...props} />
    </div>
  );
}
