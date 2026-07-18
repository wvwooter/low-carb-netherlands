import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LinkButton } from "@/components/ui/Button";
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
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
            Artikelen
          </h1>
          <p className="text-ink-500">
            Beheer welke artikelen live staan op de site.
          </p>
        </div>
        <LinkButton href="/beheer/artikelen/nieuw">Nieuw artikel</LinkButton>
      </div>
      <ArtikelenList articles={data ?? []} />
    </div>
  );
}
