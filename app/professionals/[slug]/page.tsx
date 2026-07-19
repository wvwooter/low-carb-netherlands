import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProfessionalMap } from "@/components/professionals/ProfessionalMap";
import { getVisibleProfessionalBySlug } from "@/lib/professionals";
import { normalizeWebsiteUrl } from "@/lib/format-website";
import { PROFESSION_LABELS } from "@/lib/types";
import { canonical, professionalJsonLd, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const professional = await getVisibleProfessionalBySlug(params.slug);
  if (!professional) return { title: "Professional niet gevonden" };
  return {
    title: professional.naam,
    description: professional.bio,
    ...canonical(`/professionals/${professional.slug}`),
  };
}

export default async function ProfessionalDetailPage({ params }: Props) {
  const professional = await getVisibleProfessionalBySlug(params.slug);
  if (!professional) notFound();

  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            professionalJsonLd({
              slug: professional.slug,
              naam: professional.naam,
              beroep: PROFESSION_LABELS[professional.beroep],
              bio: professional.bio,
              organisatie: professional.organisatie,
              provincie: professional.provincie,
              profielfoto_url: professional.profielfoto_url,
              website: professional.website,
            })
          ),
        }}
      />
      <div className="container-page max-w-3xl">
        <Link
          href="/professionals"
          className="mb-8 inline-block text-sm text-forest-800 hover:underline"
        >
          ← Terug naar alle professionals
        </Link>

        <div className="mb-6 flex items-center gap-5">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-forest-100 text-2xl font-semibold text-forest-800"
            aria-hidden="true"
          >
            {professional.naam
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <h1 className="font-serif text-3xl font-semibold text-forest-900">
              {professional.naam}
            </h1>
            <p className="text-ink-600">
              {PROFESSION_LABELS[professional.beroep]}
              {professional.organisatie ? ` · ${professional.organisatie}` : ""}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {professional.specialisaties.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
          {professional.online_consult && <Badge tone="amber">Online consult mogelijk</Badge>}
        </div>

        <Card className="mb-6">
          <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
            Over deze professional
          </h2>
          <p className="leading-relaxed text-ink-700">{professional.bio}</p>
        </Card>

        <Card className="mb-6">
          <h2 className="mb-4 font-serif text-lg font-semibold text-forest-900">
            Praktijkgegevens
          </h2>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-500">Locatie</dt>
              <dd className="text-ink-800">{professional.locatie}, {professional.provincie}</dd>
            </div>
            {professional.big_registratie && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-500">Registratie</dt>
                <dd className="text-ink-800">{professional.big_registratie}</dd>
              </div>
            )}
            {professional.website && normalizeWebsiteUrl(professional.website) && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-500">Website</dt>
                <dd>
                  <a
                    href={normalizeWebsiteUrl(professional.website)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-800 hover:underline"
                  >
                    {professional.website}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-500">E-mail</dt>
              <dd>
                <a href={`mailto:${professional.email}`} className="text-forest-800 hover:underline">
                  {professional.email}
                </a>
              </dd>
            </div>
            {professional.telefoonnummer && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink-500">Telefoon</dt>
                <dd className="text-ink-800">{professional.telefoonnummer}</dd>
              </div>
            )}
          </dl>
        </Card>

        {professional.latitude !== null && professional.longitude !== null && (
          <div className="mb-6">
            <ProfessionalMap
              latitude={professional.latitude}
              longitude={professional.longitude}
              naam={professional.naam}
              locatie={professional.locatie}
              provincie={professional.provincie}
            />
          </div>
        )}

        <p className="text-sm text-ink-500">
          Dit profiel is door de redactie beoordeeld en goedgekeurd. Neem
          voor medische vragen rechtstreeks contact op met de professional —
          niet via het algemene contactformulier van Low Carb Netherlands.
        </p>
      </div>
    </section>
  );
}
