import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getPublishedArticles } from "@/lib/articles";
import { ARTICLE_CATEGORY_LABELS, type ArticleCategory } from "@/lib/types";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Artikelen",
  description:
    "Artikelen over low-carb, insulineresistentie, diabetes type 2, obesitas en metabole gezondheid.",
  ...canonical("/artikelen"),
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { categorie?: string };
}

export default async function ArtikelenPage({ searchParams }: Props) {
  const active = searchParams.categorie as ArticleCategory | undefined;
  const articles = await getPublishedArticles();
  const filtered = active
    ? articles.filter((a) => a.categorie === active)
    : articles;

  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Artikelen
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Wetenschappelijk onderbouwde artikelen over koolhydraatbeperking,
            insulineresistentie en metabole gezondheid.
          </p>
          <p className="mt-3 text-sm text-ink-500">
            Op zoek naar de wetenschappelijke literatuur zelf? Bekijk onze{" "}
            <Link href="/bronnen" className="font-medium text-forest-800 underline">
              wetenschappelijke bronnen
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/artikelen"
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
              !active ? "bg-forest-800 text-white" : "bg-forest-50 text-forest-700 hover:bg-forest-100"
            }`}
          >
            Alles
          </Link>
          {Object.entries(ARTICLE_CATEGORY_LABELS).map(([value, label]) => (
            <Link
              key={value}
              href={`/artikelen?categorie=${value}`}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
                active === value ? "bg-forest-800 text-white" : "bg-forest-50 text-forest-700 hover:bg-forest-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-ink-600">
            Er zijn nog geen artikelen in deze categorie.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
