import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EvenementenList } from "./EvenementenList";

export default async function BeheerEvenementenPage() {
  const supabase = createSupabaseServerClient();

  const { data } = supabase
    ? await supabase
        .from("events")
        .select("id, titel, datum, locatie, gepubliceerd")
        .order("datum", { ascending: true })
    : { data: [] };

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Evenementen
      </h1>
      <p className="mb-8 text-ink-500">
        Beheer welke evenementen live staan op de site.
      </p>
      <EvenementenList events={data ?? []} />
    </div>
  );
}
