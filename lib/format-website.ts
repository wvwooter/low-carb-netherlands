/**
 * Normaliseert een door een gebruiker ingevoerde website-URL naar een geldige,
 * absolute URL. Regelt twee dingen die met een simpele "begint dit met
 * http(s)?" check misgaan:
 *
 * 1. Ontbrekend schema ("www.site.nl" → "https://www.site.nl").
 * 2. Een verminkt/getypt schema ("htttp:www.site.nl", "http:/site.nl") — dit
 *    werd voorheen simpelweg voorzien van een extra "https://"-prefix, wat een
 *    onbruikbare URL opleverde (bv. "https://htttp:www.site.nl").
 *
 * Retourneert null als er ook na normalisatie geen geldige URL uit komt, zodat
 * de aanroeper ervoor kan kiezen niets op te slaan in plaats van een kapotte
 * link.
 */
export function normalizeWebsiteUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Strip een eventueel (ook verminkt) schema aan het begin, bv. "htttp:",
  // "http://", "hxxp:/" — alles wat lijkt op "letters gevolgd door : en
  // optionele slashes" — zodat we schoon met "https://" kunnen beginnen.
  const withoutScheme = trimmed.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/*/, "");
  const candidate = `https://${withoutScheme}`;

  try {
    const url = new URL(candidate);
    // Moet nog altijd een herkenbaar domein hebben (met een punt erin).
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
