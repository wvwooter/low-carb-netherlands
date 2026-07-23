import { SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * Helper om een canonical-alternate toe te voegen aan een metadata-object.
 * Gebruik: export const metadata: Metadata = { title: "...", ...canonical("/pad") };
 */
export function canonical(path: string) {
  return {
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
  } as const;
}

/**
 * JSON-LD voor de organisatie zelf, sitewide op elke pagina ingeladen.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    description:
      "Het Nederlandse platform voor low-carb zorg, wetenschap en professionals.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "nl-NL",
  };
}

interface ArticleJsonLdInput {
  slug: string;
  titel: string;
  beschrijving: string;
  publicatiedatum: string;
  auteur?: string;
  afbeelding_url?: string | null;
}

export function articleJsonLd(a: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titel,
    description: a.beschrijving,
    datePublished: a.publicatiedatum,
    ...(a.afbeelding_url ? { image: [a.afbeelding_url] } : {}),
    author: {
      "@type": "Organization",
      name: a.auteur ?? SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/artikelen/${a.slug}`,
    },
  };
}

interface EventJsonLdInput {
  slug: string;
  titel: string;
  beschrijving: string;
  datum: string;
  einddatum?: string;
  locatie: string;
  inschrijflink?: string;
  afbeelding_url?: string | null;
}

export function eventJsonLd(e: EventJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.titel,
    description: e.beschrijving,
    startDate: e.datum,
    ...(e.einddatum ? { endDate: e.einddatum } : {}),
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: e.locatie,
      address: e.locatie,
    },
    ...(e.afbeelding_url ? { image: [e.afbeelding_url] } : {}),
    ...(e.inschrijflink ? { url: e.inschrijflink } : {}),
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

interface PersonJsonLdInput {
  slug: string;
  naam: string;
  beroep: string;
  bio: string;
  organisatie?: string | null;
  provincie: string;
  land?: string | null;
  profielfoto_url?: string | null;
  website?: string | null;
}

export function professionalJsonLd(p: PersonJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.naam,
    jobTitle: p.beroep,
    description: p.bio,
    url: `${SITE_URL}/professionals/${p.slug}`,
    ...(p.profielfoto_url ? { image: p.profielfoto_url } : {}),
    ...(p.website ? { sameAs: [p.website] } : {}),
    address: {
      "@type": "PostalAddress",
      addressRegion: p.provincie,
      addressCountry: p.land === "BE" ? "BE" : "NL",
    },
    ...(p.organisatie
      ? { worksFor: { "@type": "Organization", name: p.organisatie } }
      : {}),
  };
}

/** Rendert een <script type="application/ld+json"> met de gegeven data. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data);
}
