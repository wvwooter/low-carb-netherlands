export const SITE_NAME = "Low Carb Netherlands";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lowcarbnetherlands.nl";
export const SITE_TAGLINE =
  "Het Nederlandstalige platform voor low-carb zorg, wetenschap en professionals in Nederland en België.";
export const SITE_DESCRIPTION =
  "Betrouwbare informatie en deskundige begeleiding rond koolhydraatbeperking, insulineresistentie en metabole gezondheid.";

export const COUNTRIES = [
  { code: "NL", label: "Nederland" },
  { code: "BE", label: "België" },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]["code"];

export const PROVINCES_NL = [
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
] as const;

export const PROVINCES_BE = [
  "Antwerpen",
  "Henegouwen",
  "Limburg",
  "Luik",
  "Luxemburg",
  "Namen",
  "Oost-Vlaanderen",
  "Vlaams-Brabant",
  "Waals-Brabant",
  "West-Vlaanderen",
] as const;

export const PROVINCES_BY_COUNTRY: Record<CountryCode, readonly string[]> = {
  NL: PROVINCES_NL,
  BE: PROVINCES_BE,
};

// Achterwaarts compatibel: bestaande code die simpelweg "de provincies" nodig
// had (vóór de uitbreiding naar België) verwijst nog naar PROVINCES_NL.
export const PROVINCES = PROVINCES_NL;

export const SPECIALTIES = [
  "Insulineresistentie",
  "Diabetes type 2",
  "Obesitas / gewichtsbeheer",
  "PCOS",
  "Vetlever (MASLD/NAFLD)",
  "Hart- en vaatziekten",
  "Sportvoeding",
  "Kinderen en jongeren",
  "Ouderenzorg",
  "Mentale gezondheid en voeding",
] as const;

export const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/professionals", label: "Professionals" },
  { href: "/artikelen", label: "Artikelen" },
  { href: "/boeken", label: "Boeken" },
  { href: "/recepten", label: "Recepten" },
  { href: "/hulpmiddelen", label: "Hulpmiddelen" },
  { href: "/evenementen", label: "Evenementen" },
  { href: "/videos", label: "Video's" },
  { href: "/podcasts", label: "Podcasts" },
  { href: "/aanmelden", label: "Aanmelden" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_NAV = [
  { href: "/privacyverklaring", label: "Privacyverklaring" },
  { href: "/cookiebeleid", label: "Cookiebeleid" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/algemene-voorwaarden", label: "Algemene voorwaarden" },
  { href: "/medisch-voorbehoud", label: "Medisch voorbehoud" },
] as const;
