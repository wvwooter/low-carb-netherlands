import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AanmeldingenList } from "./AanmeldingenList";

export default async function AanmeldingenPage() {
  const supabase = createSupabaseServerClient();

  const { data } = supabase
    ? await supabase
        .from("professional_applications")
        .select("*")
        .eq("status", "pending")
        .order("aangemaakt_op", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Aanmeldingen
      </h1>
      <p className="mb-8 text-ink-500">
        Beoordeel nieuwe aanmeldingen van professionals voordat ze zichtbaar
        worden in de gids.
      </p>
      <AanmeldingenList applications={data ?? []} />
    </div>
  );
}
