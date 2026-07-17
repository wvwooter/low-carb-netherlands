import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArtikelenList } from "./ArtikelenList";

export default async function BeheerArtikelenPage() {
  const supabase = createSupabaseServerClient();

  const { data } = supabase
    ? await supabase
        .from("articles")
        .select("id, titel, categorie, auteur, publicatiedatum, gepubliceerd")
        .order("publicatiedatum", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Artikelen
      </h1>
      <p className="mb-8 text-ink-500">
        Beheer welke artikelen live staan op de site.
      </p>
      <ArtikelenList articles={data ?? []} />
    </div>
  );
}
