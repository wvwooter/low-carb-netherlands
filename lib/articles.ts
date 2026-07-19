import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/types";

/** Alle gepubliceerde artikelen, nieuwste eerst (voor overzicht + sitemap). */
export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select(
      "slug, titel, samenvatting, auteur, publicatiedatum, categorie, tags, hoofdfoto_url, leestijd_minuten, inhoud, referenties, disclaimer, seo_titel, seo_beschrijving"
    )
    .eq("gepubliceerd", true)
    .order("publicatiedatum", { ascending: false });

  if (error || !data) {
    console.error("Fout bij ophalen artikelen:", error);
    return [];
  }

  return data as Article[];
}

/** Eén gepubliceerd artikel op slug (voor detailpagina). */
export async function getPublishedArticleBySlug(
  slug: string
): Promise<Article | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select(
      "slug, titel, samenvatting, auteur, publicatiedatum, categorie, tags, hoofdfoto_url, leestijd_minuten, inhoud, referenties, disclaimer, seo_titel, seo_beschrijving"
    )
    .eq("slug", slug)
    .eq("gepubliceerd", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Article;
}
