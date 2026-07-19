"use client";

import dynamic from "next/dynamic";
import type { MapPin } from "./ProfessionalsMapInner";

// Leaflet raakt `window` aan tijdens het laden van de module, dus deze mag
// nooit server-side gerenderd worden. next/dynamic met ssr:false mag alleen
// binnen een Client Component staan — vandaar deze aparte wrapper.
const ProfessionalsMapInner = dynamic(
  () => import("./ProfessionalsMapInner").then((m) => m.ProfessionalsMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-sm text-ink-500">
        Kaart wordt geladen…
      </div>
    ),
  }
);

export function ProfessionalsMap({ pins }: { pins: MapPin[] }) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-ink-100 shadow-card">
      <ProfessionalsMapInner pins={pins} />
    </div>
  );
}
