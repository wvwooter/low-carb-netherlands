import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArticleForm } from "../../ArticleForm";
import { updateArticle } from "../../actions";

interface Props {
  params: { id: string };
}

export default async function BewerkArtikelPage({ params }: Props) {
  const supabase = createSupabaseServerClient();
  if (!supabase) notFound();

  const [{ data: article }, { data: categories }] = await Promise.all([
    supabase.from("articles").select("*").eq("id", params.id).maybeSingle(),
    supabase.from("categories").select("slug, naam").order("naam"),
  ]);

  if (!article) notFound();

  const action = updateArticle.bind(null, params.id);

  return (
    <div>
      <Link
        href="/beheer/artikelen"
        className="mb-4 inline-block text-sm text-forest-800 hover:underline"
      >
        ← Terug naar artikelen
      </Link>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Artikel bewerken
      </h1>
      <p className="mb-8 text-ink-500">{article.titel}</p>
      <ArticleForm
        categories={categories ?? []}
        action={action}
        article={article}
        submitLabel="Wijzigingen opslaan"
        pendingLabel="Bezig met opslaan…"
      />
    </div>
  );
}
