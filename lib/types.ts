// Centrale TypeScript-types voor Low Carb Netherlands.
// Deze types spiegelen de Supabase-tabellen in supabase/migrations/0001_init.sql.

export type ProfessionCategory =
  | "arts"
  | "medisch_specialist"
  | "huisarts"
  | "dietist"
  | "fysiotherapeut"
  | "verpleegkundig_specialist"
  | "praktijkondersteuner"
  | "leefstijlcoach"
  | "metabool_therapeut"
  | "orthomoleculair_therapeut"
  | "voedingsdeskundige"
  | "psycholoog"
  | "onderzoeker"
  | "overig";

export const PROFESSION_LABELS: Record<ProfessionCategory, string> = {
  arts: "Arts",
  medisch_specialist: "Medisch specialist",
  huisarts: "Huisarts",
  dietist: "Diëtist",
  fysiotherapeut: "Fysiotherapeut",
  verpleegkundig_specialist: "Verpleegkundig specialist",
  praktijkondersteuner: "Praktijkondersteuner",
  leefstijlcoach: "Leefstijlcoach",
  metabool_therapeut: "Metabool therapeut",
  orthomoleculair_therapeut: "Orthomoleculair therapeut",
  voedingsdeskundige: "Voedingsdeskundige",
  psycholoog: "Psycholoog",
  onderzoeker: "Onderzoeker",
  overig: "Overige professional",
};

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Professional {
  id: string;
  slug: string;
  naam: string;
  profielfoto_url: string | null;
  beroep: ProfessionCategory;
  big_registratie: string | null;
  organisatie: string | null;
  locatie: string;
  land: string;
  provincie: string;
  postcode: string | null;
  website: string | null;
  email: string;
  telefoonnummer: string | null;
  specialisaties: string[];
  ervaring_low_carb: boolean;
  ervaring_diabetes_type_2: boolean;
  ervaring_obesitas: boolean;
  ervaring_metabole_gezondheid: boolean;
  online_consult: boolean;
  bio: string;
  goedkeuringsstatus: ApprovalStatus;
  zichtbaar: boolean;
  aangemeld_op: string;
  latitude: number | null;
  longitude: number | null;
}

export interface ProfessionalApplication {
  voornaam: string;
  achternaam: string;
  beroep: ProfessionCategory;
  beroepsregistratie: string;
  registratienummer: string;
  organisatie: string;
  adres: string;
  postcode: string;
  plaats: string;
  land: string;
  provincie: string;
  website: string;
  email: string;
  telefoonnummer: string;
  online_begeleiding: boolean;
  opleidingen: string;
  ervaring_low_carb: string;
  behandelgebieden: string;
  motivatie: string;
  akkoord_privacy: boolean;
  akkoord_uitgangspunten: boolean;
}

export type ArticleCategory =
  | "low-carb"
  | "insulineresistentie"
  | "diabetes-type-2"
  | "obesitas"
  | "metabole-gezondheid"
  | "voeding"
  | "beweging"
  | "gewrichten"
  | "wetenschap"
  | "praktijkverhalen"
  | "opinie";

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "low-carb": "Low-carb",
  insulineresistentie: "Insulineresistentie",
  "diabetes-type-2": "Diabetes type 2",
  obesitas: "Obesitas",
  "metabole-gezondheid": "Metabole gezondheid",
  voeding: "Voeding",
  beweging: "Beweging",
  gewrichten: "Gewrichten",
  wetenschap: "Wetenschap",
  praktijkverhalen: "Praktijkverhalen",
  opinie: "Opinie",
};

export interface Article {
  slug: string;
  titel: string;
  samenvatting: string;
  auteur: string;
  publicatiedatum: string;
  categorie: ArticleCategory;
  tags: string[];
  hoofdfoto_url: string;
  leestijd_minuten: number;
  inhoud: string;
  referenties: string[];
  disclaimer: string;
  seo_titel: string;
  seo_beschrijving: string;
}

export interface EventItem {
  slug: string;
  titel: string;
  datum: string;
  einddatum?: string;
  begintijd: string;
  eindtijd: string;
  locatie: string;
  modaliteit: "online" | "fysiek" | "hybride";
  organisator: string;
  beschrijving: string;
  doelgroep: string;
  inschrijflink: string;
  prijs: string;
  afbeelding_url: string;
}

export interface Video {
  id: string;
  titel: string;
  beschrijving: string | null;
  youtube_url: string;
  gepubliceerd: boolean;
  bron: string | null;
  aangemaakt_op: string;
}
