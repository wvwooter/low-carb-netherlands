import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ARTICLE_CATEGORY_LABELS, type Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Badge>{ARTICLE_CATEGORY_LABELS[article.categorie]}</Badge>
        <span className="text-xs text-ink-500">{article.leestijd_minuten} min</span>
      </div>
      <h3 className="mb-2 font-serif text-lg font-semibold leading-snug text-forest-900">
        <Link href={`/artikelen/${article.slug}`} className="hover:underline">
          {article.titel}
        </Link>
      </h3>
      <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-700">
        {article.samenvatting}
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4 text-xs text-ink-500">
        <span>{article.auteur}</span>
        <time dateTime={article.publicatiedatum}>
          {new Date(article.publicatiedatum).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>
    </Card>
  );
}
