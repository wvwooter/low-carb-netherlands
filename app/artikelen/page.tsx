import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MOCK_ARTICLES } from "@/lib/mock-data/articles";
import { ARTICLE_CATEGORY_LABELS, type ArticleCategory } from "@/lib/types";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Artikelen",
  description:
    "Artikelen over low-carb, insulineresistentie, diabetes type 2, obesitas en metabole gezondheid.",
  ...canonical("/artikelen"),
};

interface Props {
  searchParams: { categorie?: string };
}

export default function ArtikelenPage({ searchParams }: Props) {
  const active = searchParams.categorie as ArticleCategory | undefined;
  const filtered = active
    ? MOCK_ARTICLES.filter((a) => a.categorie === active)
    : MOCK_ARTICLES;

  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Artikelen
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Wetenschappelijk onderbouwde artikelen over koolhydraatbeperking,
            insulineresistentie en metabole gezondheid. Onderstaande
            artikelen zijn voorbeeldcontent ter illustratie van de
            structuur.
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
