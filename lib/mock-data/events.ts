import type { EventItem } from "@/lib/types";

// VOORBEELDEVENEMENTEN — demo-content, duidelijk gemarkeerd.

export const MOCK_EVENTS: EventItem[] = [
  {
    slug: "webinar-low-carb-basis",
    titel: "[Voorbeeld] Webinar: Low-carb in de huisartsenpraktijk",
    datum: "2026-09-10",
    begintijd: "19:30",
    eindtijd: "21:00",
    locatie: "Online",
    modaliteit: "online",
    organisator: "Low Carb Netherlands (voorbeeld)",
    beschrijving:
      "Een introductiewebinar over het toepassen van koolhydraatbeperking als behandeloptie in de eerstelijnszorg.",
    doelgroep: "Huisartsen, praktijkondersteuners",
    inschrijflink: "#",
    prijs: "Gratis",
    afbeelding_url: "",
  },
  {
    slug: "congres-metabole-gezondheid",
    titel: "[Voorbeeld] Nationaal congres Metabole Gezondheid",
    datum: "2026-11-05",
    begintijd: "09:00",
    eindtijd: "17:00",
    locatie: "Utrecht (Jaarbeurs, fictief)",
    modaliteit: "fysiek",
    organisator: "Low Carb Netherlands i.s.m. partners (voorbeeld)",
    beschrijving:
      "Een dag met lezingen en workshops over insulineresistentie, voeding en interdisciplinaire samenwerking.",
    doelgroep: "Artsen, diëtisten, fysiotherapeuten, leefstijlcoaches",
    inschrijflink: "#",
    prijs: "€ 95",
    afbeelding_url: "",
  },
];
