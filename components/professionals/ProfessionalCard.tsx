import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PROFESSION_LABELS, type Professional } from "@/lib/types";

export function ProfessionalCard({ professional }: { professional: Professional }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest-100 text-lg font-semibold text-forest-800"
          aria-hidden="true"
        >
          {professional.naam
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-forest-900">
            {professional.naam}
          </h3>
          <p className="text-sm text-ink-500">
            {PROFESSION_LABELS[professional.beroep]}
            {professional.organisatie ? ` · ${professional.organisatie}` : ""}
          </p>
        </div>
      </div>

      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-700">
        {professional.bio}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {professional.specialisaties.slice(0, 3).map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
        {professional.online_consult && <Badge tone="amber">Online mogelijk</Badge>}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4">
        <span className="text-sm text-ink-500">
          {professional.locatie}, {professional.provincie}
        </span>
        <Link
          href={`/professionals/${professional.slug}`}
          className="text-sm font-medium text-forest-800 hover:underline"
        >
          Bekijk profiel →
        </Link>
      </div>
    </Card>
  );
}
