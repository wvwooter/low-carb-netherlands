import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ArticleContent } from "@/components/articles/ArticleContent";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import { canonical, articleJsonLd, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getPublishedArticleBySlug(params.slug);
  if (!article) return { title: "Artikel niet gevonden" };
  return {
    title: article.seo_titel,
    description: article.seo_beschrijving,
    ...canonical(`/artikelen/${article.slug}`),
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getPublishedArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            articleJsonLd({
              slug: article.slug,
              titel: article.titel,
              beschrijving: article.samenvatting,
              publicatiedatum: article.publicatiedatum,
              auteur: article.auteur,
              afbeelding_url: article.hoofdfoto_url,
            })
          ),
        }}
      />
      <div className="container-page max-w-3xl">
        <Link href="/artikelen" className="mb-8 inline-block text-sm text-forest-800 hover:underline">
          ← Alle artikelen
        </Link>

        <Badge>{ARTICLE_CATEGORY_LABELS[article.categorie]}</Badge>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-forest-900">
          {article.titel}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
          <span>{article.auteur}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publicatiedatum}>
            {new Date(article.publicatiedatum).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{article.leestijd_minuten} min leestijd</span>
        </div>

        <ArticleContent inhoud={article.inhoud} />

        {article.referenties.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">Referenties</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-ink-600">
              {article.referenties.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <Card className="mt-10 border-amber-200 bg-amber-50">
          <p className="text-sm leading-relaxed text-ink-700">{article.disclaimer}</p>
        </Card>
      </div>
    </article>
  );
}
