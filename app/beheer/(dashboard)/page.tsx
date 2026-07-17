import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { pending: 0, professionals: 0, articles: 0, events: 0 };
  }

  const [pending, professionals, articles, events] = await Promise.all([
    supabase
      .from("professional_applications")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("professionals").select("id", { count: "exact", head: true }),
    supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("gepubliceerd", false),
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("gepubliceerd", false),
  ]);

  return {
    pending: pending.count ?? 0,
    professionals: professionals.count ?? 0,
    articles: articles.count ?? 0,
    events: events.count ?? 0,
  };
}

export default async function BeheerOverviewPage() {
  const counts = await getCounts();

  const tiles = [
    {
      href: "/beheer/aanmeldingen",
      label: "Openstaande aanmeldingen",
      value: counts.pending,
      hint: "Wachten op beoordeling",
    },
    {
      href: "/beheer/professionals",
      label: "Professionals",
      value: counts.professionals,
      hint: "Totaal in de gids",
    },
    {
      href: "/beheer/artikelen",
      label: "Artikelen (concept)",
      value: counts.articles,
      hint: "Nog niet gepubliceerd",
    },
    {
      href: "/beheer/evenementen",
      label: "Evenementen (concept)",
      value: counts.events,
      hint: "Nog niet gepubliceerd",
    },
  ];

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Overzicht
      </h1>
      <p className="mb-8 text-ink-500">
        Welkom in het beheerpaneel van Low Carb Netherlands.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href}>
            <Card className="h-full transition-colors hover:border-forest-300">
              <p className="text-sm font-medium text-ink-500">{tile.label}</p>
              <p className="mt-2 font-serif text-3xl font-semibold text-forest-900">
                {tile.value}
              </p>
              <p className="mt-1 text-xs text-ink-500">{tile.hint}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
