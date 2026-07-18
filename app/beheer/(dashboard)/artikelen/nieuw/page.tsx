import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArticleForm } from "../ArticleForm";
import { createArticle } from "../actions";

export default async function NieuwArtikelPage() {
  const supabase = createSupabaseServerClient();
  const { data: categories } = supabase
    ? await supabase.from("categories").select("slug, naam").order("naam")
    : { data: [] };

  return (
    <div>
      <Link
        href="/beheer/artikelen"
        className="mb-4 inline-block text-sm text-forest-800 hover:underline"
      >
        ← Terug naar artikelen
      </Link>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Nieuw artikel
      </h1>
      <p className="mb-8 text-ink-500">
        Het artikel wordt als concept opgeslagen; publiceer het daarna vanuit
        het overzicht.
      </p>
      <ArticleForm
        categories={categories ?? []}
        action={createArticle}
        submitLabel="Artikel opslaan"
        pendingLabel="Bezig met opslaan…"
      />
    </div>
  );
}
