import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { EventItem } from "@/lib/types";
import { formatEventDate } from "@/lib/format-event-date";

const MODALITEIT_LABEL: Record<EventItem["modaliteit"], string> = {
  online: "Online",
  fysiek: "Fysiek",
  hybride: "Hybride",
};

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Badge tone="amber">{MODALITEIT_LABEL[event.modaliteit]}</Badge>
        <time dateTime={event.datum} className="text-xs text-ink-500">
          {formatEventDate(event.datum, event.einddatum)}
        </time>
      </div>
      <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-forest-900">
        <Link href={`/evenementen/${event.slug}`} className="hover:underline">
          {event.titel}
        </Link>
      </h3>
      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-700">
        {event.beschrijving}
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-ink-500">
        <span>{event.locatie}</span>
        <span>{event.prijs}</span>
      </div>
    </Card>
  );
}
