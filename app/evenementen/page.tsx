import type { Metadata } from "next";
import { EventCard } from "@/components/events/EventCard";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Evenementen",
  description:
    "Congressen, lezingen, webinars en nascholing over low-carb en metabole gezondheid.",
  ...canonical("/evenementen"),
};

export default function EvenementenPage() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Evenementen
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Congressen, lezingen, webinars, nascholing en lokale
            bijeenkomsten rond low-carb en metabole gezondheid.
          </p>
        </div>

        {MOCK_EVENTS.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-forest-50/40 p-12 text-center">
            <p className="text-ink-600">
              Er staan momenteel geen evenementen gepland.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_EVENTS.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
