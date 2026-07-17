import type { Article } from "@/lib/types";

// VOORBEELDARTIKELEN — duidelijk gemarkeerd als demo-content.
// Vervang door echte, geredigeerde en medisch gecontroleerde artikelen
// vóór lancering.

export const MOCK_ARTICLES: Article[] = [
  {
    slug: "wat-is-insulineresistentie",
    titel: "[Voorbeeldartikel] Wat is insulineresistentie precies?",
    samenvatting:
      "Een inleiding op insulineresistentie: wat het is, hoe het ontstaat en waarom het een centrale rol speelt bij metabole gezondheid.",
    auteur: "Redactie Low Carb Netherlands (voorbeeld)",
    publicatiedatum: "2026-05-12",
    categorie: "insulineresistentie",
    tags: ["insuline", "metabolisme", "basis"],
    hoofdfoto_url: "",
    leestijd_minuten: 6,
    inhoud:
      "Dit is voorbeeldtekst. Insulineresistentie ontstaat wanneer cellen minder goed reageren op insuline, waardoor de alvleesklier meer insuline moet aanmaken om de bloedsuikerspiegel stabiel te houden. Dit artikel wordt vervangen door inhoudelijk gecontroleerde, wetenschappelijk onderbouwde tekst vóór publicatie.",
    referenties: ["[Voorbeeld] Placeholder-referentie, in te vullen door redactie."],
    disclaimer:
      "Dit artikel is bedoeld ter informatie en vervangt geen individueel medisch advies.",
    seo_titel: "Wat is insulineresistentie? | Low Carb Netherlands",
    seo_beschrijving:
      "Uitleg over insulineresistentie: oorzaken, gevolgen en de rol van koolhydraatbeperking.",
  },
  {
    slug: "low-carb-en-diabetes-type-2",
    titel: "[Voorbeeldartikel] Koolhydraatbeperking bij diabetes type 2",
    samenvatting:
      "Een overzicht van de wetenschappelijke stand van zaken rond low-carb voeding als onderdeel van diabeteszorg.",
    auteur: "Redactie Low Carb Netherlands (voorbeeld)",
    publicatiedatum: "2026-04-28",
    categorie: "diabetes-type-2",
    tags: ["diabetes", "voeding", "wetenschap"],
    hoofdfoto_url: "",
    leestijd_minuten: 8,
    inhoud:
      "Dit is voorbeeldtekst. Meerdere onderzoeken laten zien dat koolhydraatbeperking kan bijdragen aan verbeterde bloedsuikerregulatie bij diabetes type 2, mits begeleid door een arts of diëtist. Definitieve tekst en bronvermelding volgen.",
    referenties: ["[Voorbeeld] Placeholder-referentie, in te vullen door redactie."],
    disclaimer:
      "Dit artikel is bedoeld ter informatie en vervangt geen individueel medisch advies. Pas medicatie nooit zelfstandig aan.",
    seo_titel: "Low-carb bij diabetes type 2 | Low Carb Netherlands",
    seo_beschrijving:
      "Wat zegt de wetenschap over koolhydraatbeperking als onderdeel van de behandeling van diabetes type 2?",
  },
  {
    slug: "beweging-en-metabole-gezondheid",
    titel: "[Voorbeeldartikel] De rol van beweging naast voeding",
    samenvatting:
      "Waarom beweging, naast koolhydraatbeperking, een belangrijke pijler is voor metabole gezondheid.",
    auteur: "Redactie Low Carb Netherlands (voorbeeld)",
    publicatiedatum: "2026-03-15",
    categorie: "beweging",
    tags: ["beweging", "leefstijl"],
    hoofdfoto_url: "",
    leestijd_minuten: 5,
    inhoud:
      "Dit is voorbeeldtekst over de samenhang tussen spiermassa, insulinegevoeligheid en regelmatige lichaamsbeweging.",
    referenties: ["[Voorbeeld] Placeholder-referentie, in te vullen door redactie."],
    disclaimer:
      "Dit artikel is bedoeld ter informatie en vervangt geen individueel medisch advies.",
    seo_titel: "Beweging en metabole gezondheid | Low Carb Netherlands",
    seo_beschrijving:
      "Hoe beweging en koolhydraatbeperking elkaar versterken bij metabole gezondheid.",
  },
];
