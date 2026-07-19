import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { formatEventDate } from "@/lib/format-event-date";
import { canonical, eventJsonLd, jsonLdScript } from "@/lib/seo";

interface Props {
  params: { slug: string };
}

function getEvent(slug: string) {
  return MOCK_EVENTS.find((e) => e.slug === slug);
}

export function generateMetadata({ params }: Props): Metadata {
  const event = getEvent(params.slug);
  if (!event) return { title: "Evenement niet gevonden" };
  return {
    title: event.titel,
    description: event.beschrijving,
    ...canonical(`/evenementen/${event.slug}`),
  };
}

export function generateStaticParams() {
  return MOCK_EVENTS.map((e) => ({ slug: e.slug }));
}

export default function EventDetailPage({ params }: Props) {
  const event = getEvent(params.slug);
  if (!event) notFound();

  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            eventJsonLd({
              slug: event.slug,
              titel: event.titel,
              beschrijving: event.beschrijving,
              datum: event.datum,
              einddatum: event.einddatum,
              locatie: event.locatie,
              inschrijflink: event.inschrijflink,
              afbeelding_url: event.afbeelding_url,
            })
          ),
        }}
      />
      <div className="container-page max-w-3xl">
        <Link href="/evenementen" className="mb-8 inline-block text-sm text-forest-800 hover:underline">
          ← Alle evenementen
        </Link>

        <Badge tone="amber">{event.modaliteit === "online" ? "Online" : event.modaliteit === "fysiek" ? "Fysiek" : "Hybride"}</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-forest-900">
          {event.titel}
        </h1>

        <dl className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Datum</dt>
            <dd className="text-ink-800">
              {formatEventDate(event.datum, event.einddatum)}
              {event.begintijd && event.eindtijd
                ? `, ${event.begintijd}–${event.eindtijd}`
                : ""}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Locatie</dt>
            <dd className="text-ink-800">{event.locatie}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Organisator</dt>
            <dd className="text-ink-800">{event.organisator}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Doelgroep</dt>
            <dd className="text-ink-800">{event.doelgroep}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink-500">Prijs</dt>
            <dd className="text-ink-800">{event.prijs}</dd>
          </div>
        </dl>

        <p className="mt-8 leading-relaxed text-ink-700">{event.beschrijving}</p>

        <a href={event.inschrijflink}>
          <Button size="lg" className="mt-8">Inschrijven</Button>
        </a>
      </div>
    </section>
  );
}
