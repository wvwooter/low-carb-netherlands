interface ArticleContentProps {
  inhoud: string;
}

/**
 * Rendert artikeltekst uit de database naar opgemaakte HTML.
 * Ondersteunt eenvoudige opmaak zonder een markdown-dependency:
 * - Lege regel = nieuwe alinea
 * - Regel die begint met "## " = subkop (h2)
 * - Opeenvolgende regels die beginnen met "- " = bullet-lijst
 */
export function ArticleContent({ inhoud }: ArticleContentProps) {
  const blocks = inhoud.trim().split(/\n\s*\n/);

  return (
    <div className="prose prose-forest mt-8 max-w-none leading-relaxed text-ink-800">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mt-10 mb-3 font-serif text-2xl font-semibold text-forest-900"
            >
              {trimmed.slice(3)}
            </h2>
          );
        }

        const lines = trimmed.split("\n").map((l) => l.trim());
        if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-inside list-disc space-y-1">
              {lines.map((l, j) => (
                <li key={j}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
}
