import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { ProfessionalFilters } from "@/components/professionals/ProfessionalFilters";
import { ProfessionalsMap } from "@/components/professionals/ProfessionalsMap";
import { LinkButton } from "@/components/ui/Button";
import { getVisibleProfessionals } from "@/lib/professionals";
import type { ProfessionCategory } from "@/lib/types";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Professionals",
  description:
    "Vind artsen, diëtisten, fysiotherapeuten en andere professionals met ervaring in low-carb en metabole gezondheid.",
  ...canonical("/professionals"),
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    beroep?: string;
    land?: string;
    provincie?: string;
    plaats?: string;
    specialisatie?: string;
    online?: string;
  };
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-ink-200 bg-forest-50/40 p-12 text-center">
      <h2 className="font-serif text-xl font-semibold text-forest-900">
        Nog geen professionals gevonden
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-600">
        Er zijn nog geen goedgekeurde professionals die aan deze filters
        voldoen. De verwijsgids wordt de komende periode verder gevuld.
        Ben je zelf professional?
      </p>
      <LinkButton href="/aanmelden" className="mt-5">
        Meld je aan als professional
      </LinkButton>
    </div>
  );
}

export default async function ProfessionalsPage({ searchParams }: Props) {
  const professionals = await getVisibleProfessionals();

  const filtered = professionals.filter((p) => {
    if (!p.zichtbaar || p.goedkeuringsstatus !== "approved") return false;
    if (
      searchParams.beroep &&
      p.beroep !== (searchParams.beroep as ProfessionCategory)
    )
      return false;
    if (searchParams.land && p.land !== searchParams.land) return false;
    if (searchParams.provincie && p.provincie !== searchParams.provincie)
      return false;
    if (
      searchParams.plaats &&
      !p.locatie.toLowerCase().includes(searchParams.plaats.toLowerCase())
    )
      return false;
    if (
      searchParams.specialisatie &&
      !p.specialisaties.includes(searchParams.specialisatie)
    )
      return false;
    if (searchParams.online === "1" && !p.online_consult) return false;
    return true;
  });

  return (
    <>
      <section className="section bg-forest-50/40 !pb-10">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Vind een professional
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Een overzicht van artsen, diëtisten, fysiotherapeuten en andere
            professionals met ervaring in low-carb en metabole gezondheid.
            Elk profiel is beoordeeld voordat het zichtbaar wordt.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="container-page">
          <div className="mb-10 rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <Suspense fallback={null}>
              <ProfessionalFilters />
            </Suspense>
          </div>

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {(() => {
                const pins = filtered
                  .filter(
                    (p): p is typeof p & { latitude: number; longitude: number } =>
                      p.latitude !== null && p.longitude !== null
                  )
                  .map((p) => ({
                    slug: p.slug,
                    naam: p.naam,
                    locatie: p.locatie,
                    provincie: p.provincie,
                    latitude: p.latitude,
                    longitude: p.longitude,
                  }));
                return pins.length > 0 ? (
                  <div className="mb-10">
                    <ProfessionalsMap pins={pins} />
                  </div>
                ) : null;
              })()}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProfessionalCard key={p.id} professional={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
