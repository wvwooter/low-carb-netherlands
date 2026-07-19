import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Boeken",
  description:
    "Een selectie boeken over koolhydraatbeperking, insulineresistentie en metabole gezondheid: wetenschap, praktijk en kookboeken.",
};

interface Boek {
  auteurs: string;
  titel: string;
  jaar: string;
  beschrijving: string;
  bolUrl: string;
}

interface Categorie {
  titel: string;
  intro: string;
  boeken: Boek[];
}

const BOL_AFFILIATE_ID = "1532849";
const BOL_AFFILIATE_FLAG = "TXL";

function affiliateLink(bolUrl: string, naam: string) {
  const params = new URLSearchParams({
    p: "2",
    t: "url",
    s: BOL_AFFILIATE_ID,
    f: BOL_AFFILIATE_FLAG,
    url: bolUrl,
    name: naam,
  });
  return `https://partner.bol.com/click/click?${params.toString()}`;
}

const CATEGORIEEN: Categorie[] = [
  {
    titel: "Wetenschap",
    intro:
      "Toegankelijke, goed onderbouwde boeken die de wetenschap achter koolhydraatbeperking, insulineresistentie en metabole gezondheid uitleggen.",
    boeken: [
      {
        auteurs: "Gary Taubes",
        titel: "Good Calories, Bad Calories",
        jaar: "2007",
        beschrijving:
          "Uitgebreide, kritische geschiedenis van het wetenschappelijk denken over vet, koolhydraten en gewichtstoename.",
        bolUrl: "https://www.bol.com/nl/nl/p/good-calories-bad-calories/1001004006295176/",
      },
      {
        auteurs: "Gary Taubes",
        titel: "The Case Against Sugar",
        jaar: "2016",
        beschrijving:
          "Onderzoek naar de rol van suiker in de opkomst van obesitas, diabetes type 2 en andere chronische ziekten.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-case-against-sugar/9200000057582553/",
      },
      {
        auteurs: "Nina Teicholz",
        titel: "The Big Fat Surprise",
        jaar: "2014",
        beschrijving:
          "Onderzoeksjournalistiek over hoe verzadigd vet decennialang ten onrechte als hoofdoorzaak van hartziekten werd aangewezen.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-big-fat-surprise/9200000009948524/",
      },
      {
        auteurs: "Benjamin Bikman",
        titel: "Why We Get Sick",
        jaar: "2020",
        beschrijving:
          "Uitleg door een metabolisme-onderzoeker over insulineresistentie als gemeenschappelijke wortel van veel chronische ziekten.",
        bolUrl: "https://www.bol.com/nl/nl/p/why-we-get-sick/9300000014866524/",
      },
      {
        auteurs: "William Davis",
        titel: "Wheat Belly",
        jaar: "2011",
        beschrijving:
          "Cardioloog William Davis over de effecten van moderne tarweconsumptie op gewicht en gezondheid.",
        bolUrl: "https://www.bol.com/nl/nl/p/wheat-belly-wheat-belly/9200000033052347/",
      },
      {
        auteurs: "Gary Taubes",
        titel: "Why We Get Fat",
        jaar: "2010",
        beschrijving:
          "Toegankelijker vervolg op Good Calories, Bad Calories over waarom we dik worden en wat daaraan te doen is.",
        bolUrl: "https://www.bol.com/nl/nl/p/why-we-get-fat/1001004010611701/",
      },
      {
        auteurs: "Gary Taubes",
        titel: "The Case for Keto",
        jaar: "2020",
        beschrijving:
          "Gebaseerd op twintig jaar onderzoeksjournalistiek en gesprekken met artsen over ketogene voeding als aanpak voor gewichtsbeheersing.",
        bolUrl: "https://www.bol.com/nl/nl/p/the-case-for-keto/9200000120465435/",
      },
      {
        auteurs: "Robert Lustig",
        titel: "Metabolical",
        jaar: "2021",
        beschrijving:
          "Kinderarts en onderzoeker Robert Lustig over hoe bewerkt voedsel bijdraagt aan chronische ziekte.",
        bolUrl: "https://www.bol.com/nl/nl/f/metabolical/9300000007752342/",
      },
      {
        auteurs: "James DiNicolantonio",
        titel: "The Salt Fix",
        jaar: "2017",
        beschrijving:
          "Cardiovasculair onderzoeker James DiNicolantonio over hoe zout ten onrechte als gezondheidsrisico werd aangewezen.",
        bolUrl: "https://www.bol.com/nl/nl/p/the-salt-fix/9200000058993534/",
      },
      {
        auteurs: "James DiNicolantonio en Jason Fung",
        titel: "The Longevity Solution",
        jaar: "2019",
        beschrijving:
          "Vijf stappen voor een langer, gezonder leven, gebaseerd op de leefstijl van de langstlevende bevolkingsgroepen ter wereld.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-longevity-solution/9200000103401949/",
      },
    ],
  },
  {
    titel: "Praktijk",
    intro:
      "Praktische gidsen voor patienten en zorgverleners die koolhydraatbeperking, vasten of medicatie-afbouw willen toepassen.",
    boeken: [
      {
        auteurs: "Jason Fung",
        titel: "The Obesity Code",
        jaar: "2016",
        beschrijving:
          "Nefroloog Jason Fung over de hormonale (in plaats van calorie-gerichte) benadering van overgewicht.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-obesity-code/9200000055686970/",
      },
      {
        auteurs: "Jason Fung",
        titel: "The Diabetes Code",
        jaar: "2018",
        beschrijving:
          "Praktische uitleg over het voorkomen en omkeren van diabetes type 2 via voeding en leefstijl.",
        bolUrl: "https://www.bol.com/nl/nl/p/the-diabetes-code/9200000081770488/",
      },
      {
        auteurs: "Jason Fung en Jimmy Moore",
        titel: "The Complete Guide to Fasting",
        jaar: "2016",
        beschrijving:
          "Praktische gids voor intermitterend, alternate-day en langer vasten, inclusief protocollen en veelgestelde vragen.",
        bolUrl: "https://www.bol.com/nl/nl/p/complete-guide-to-fasting/9200000067647825/",
      },
      {
        auteurs: "Stephen Phinney en Jeff Volek",
        titel: "The Art and Science of Low Carbohydrate Living",
        jaar: "2011",
        beschrijving:
          "Naslagwerk van twee vooraanstaande onderzoekers over de klinische toepassing van koolhydraatbeperking.",
        bolUrl:
          "https://www.bol.com/nl/nl/p/the-art-and-science-of-low-carbohydrate-living/9200000028909767/",
      },
      {
        auteurs: "Stephen Phinney en Jeff Volek",
        titel: "The Art and Science of Low Carbohydrate Performance",
        jaar: "2012",
        beschrijving:
          "Vervolg gericht op koolhydraatbeperking en sportprestaties, voor sporters en coaches.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("Art and Science of Low Carbohydrate Performance Volek Phinney"),
      },
      {
        auteurs: "Eric Westman, Stephen Phinney en Jeff Volek",
        titel: "The New Atkins for a New You",
        jaar: "2010",
        beschrijving:
          "Herziene, wetenschappelijk onderbouwde versie van de Atkins-aanpak voor dagelijks gebruik.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-new-atkins-for-a-new-you/9200000013653374/",
      },
      {
        auteurs: "Jason Fung",
        titel: "The Cancer Code",
        jaar: "2020",
        beschrijving:
          "Jason Fung over de rol van insulineontregeling bij het ontstaan en de behandeling van kanker.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-cancer-code/9200000130196715/",
      },
      {
        auteurs: "Peter Brukner",
        titel: "A Fat Lot of Good",
        jaar: "2018",
        beschrijving:
          "Australische sportarts Peter Brukner over hoe voedingsadviezen decennialang misgingen en hoe je zelf de regie neemt.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("A Fat Lot of Good Peter Brukner"),
      },
      {
        auteurs: "Peter Brukner",
        titel: "The Diabetes Plan",
        jaar: "2023",
        beschrijving:
          "Praktische gids met menuplannen en recepten om diabetes type 2 via koolhydraatbeperking te voorkomen of terug te dringen.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("The Diabetes Plan Peter Brukner"),
      },
      {
        auteurs: "Richard K. Bernstein",
        titel: "Dr. Bernstein's Diabetes Solution",
        jaar: "1997 (vierde editie bijgewerkt)",
        beschrijving:
          "Klassieker over het normaliseren van bloedsuikers bij diabetes type 1 en 2 via strikte koolhydraatbeperking.",
        bolUrl: "https://www.bol.com/nl/nl/p/dr-bernstein-s-diabetes-solution/9200000018035494/",
      },
      {
        auteurs: "Trudi Deakin / X-PERT Health",
        titel: "X-PERT Diabetes Prevention and Management",
        jaar: "doorlopend bijgewerkt",
        beschrijving:
          "Handboek van het Britse scholingsprogramma X-PERT Health voor zelfmanagement bij prediabetes en diabetes type 2.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("X-PERT Diabetes Prevention and Management Trudi Deakin"),
      },
      {
        auteurs: "Sarah Hallberg en Nina Teicholz",
        titel: "Status Quo Thinking Is Harming Your Health",
        jaar: "2024",
        beschrijving:
          "Postuum verschenen slotpleidooi van arts Sarah Hallberg tegen vastgeroeste aannames in de reguliere gezondheidszorg.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("Status Quo Thinking Is Harming Your Health Sarah Hallberg"),
      },
    ],
  },
  {
    titel: "Kookboeken",
    intro: "Receptenboeken om koolhydraatarm en ketogeen eten in de praktijk te brengen.",
    boeken: [
      {
        auteurs: "Leanne Vogel",
        titel: "The Keto Diet",
        jaar: "2017",
        beschrijving:
          "Complete gids met recepten en meerdere 28-dagen-menu's om ketogeen te gaan eten.",
        bolUrl: "https://www.bol.com/nl/nl/p/the-keto-diet/9300000007176548/",
      },
      {
        auteurs: "Maria Emmerich",
        titel: "Quick & Easy Ketogenic Cooking",
        jaar: "2016",
        beschrijving:
          "Snelle, tijdbesparende ketogene recepten en menuplanning voor de dagelijkse praktijk.",
        bolUrl: "https://www.bol.com/nl/nl/p/quick-easy-ketogenic-cooking/9200000056338222/",
      },
      {
        auteurs: "Martina Slajerova",
        titel: "The KetoDiet Cookbook",
        jaar: "2016",
        beschrijving:
          "Meer dan 150 koolhydraatarme, vetrijke recepten, graanvrij en suikervrij.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("The KetoDiet Cookbook Martina Slajerova"),
      },
      {
        auteurs: "Maria Emmerich",
        titel: "Keto Comfort Foods",
        jaar: "2018",
        beschrijving:
          "Bekende, herkenbare gerechten opnieuw bedacht als koolhydraatarme, ketogene versies.",
        bolUrl: "https://www.bol.com/nl/nl/f/keto-comfort-foods/9200000074057721/",
      },
      {
        auteurs: "Tim Noakes e.a.",
        titel: "The Real Meal Revolution 2.0",
        jaar: "2017",
        beschrijving:
          "Bijgewerkte editie van de bekende Zuid-Afrikaanse LCHF-bestseller, met een viertrapsaanpak en praktische voedingslijsten.",
        bolUrl: "https://www.bol.com/nl/nl/f/the-real-meal-revolution-2-0/9200000073222103/",
      },
      {
        auteurs: "Grant Schofield, Caryn Zinn en Craig Rodger",
        titel: "What the Fast!",
        jaar: "2018",
        beschrijving:
          "Praktische gids voor het combineren van vasten met koolhydraatarme, vetrijke voeding.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("What the Fast Grant Schofield Caryn Zinn"),
      },
      {
        auteurs: "Grant Schofield, Caryn Zinn en Craig Rodger",
        titel: "What the Fat? Recipes",
        jaar: "2019",
        beschrijving:
          "Receptenboek met koolhydraatarme, vetrijke gerechten voor het dagelijks gebruik.",
        bolUrl:
          "https://www.bol.com/nl/nl/s/?searchtext=" +
          encodeURIComponent("What the Fat Recipes Caryn Zinn"),
      },
    ],
  },
];

const AUTEURSBOEK: Boek = {
  auteurs: "Wouter van Wijhe",
  titel: "De sterkste pijnstiller",
  jaar: "2025",
  beschrijving:
    "Als orthopedisch chirurg zag Wouter van Wijhe dagelijks hoe overgewicht leidt tot pijn, artrose en hogere operatierisico's. Op basis van insulineresistentie en de rol van insuline bij vetopslag ontwikkelde hij een aanpak waarmee patienten niet alleen blijvend afvielen, maar vaak ook binnen weken minder gewrichtspijn hadden.",
  bolUrl: "https://www.bol.com/nl/nl/p/de-sterkste-pijnstiller/9300000257233931/",
};

export default function BoekenPage() {
  return (
    <>
      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Boeken
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Een selectie boeken over koolhydraatbeperking, insulineresistentie
            en metabole gezondheid: van wetenschappelijke naslagwerken tot
            praktische gidsen en kookboeken. Deze lijst is niet uitputtend en
            wordt regelmatig aangevuld.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-forest-900">
            Van de auteur
          </h2>
          <Card className="mt-6 border-forest-200 bg-forest-50/60">
            <p className="text-sm leading-relaxed text-ink-700">
              <span className="font-medium text-forest-900">
                {AUTEURSBOEK.auteurs} — {AUTEURSBOEK.titel}
              </span>{" "}
              <span className="italic">({AUTEURSBOEK.jaar})</span>.{" "}
              {AUTEURSBOEK.beschrijving}
            </p>
            <div className="mt-2">
              <a
                href={affiliateLink(AUTEURSBOEK.bolUrl, `${AUTEURSBOEK.titel}, ${AUTEURSBOEK.auteurs}`)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-xs font-medium text-forest-800 underline hover:text-forest-700"
              >
                Bekijk op bol.com →
              </a>
            </div>
          </Card>
        </div>
      </section>

      {CATEGORIEEN.map((cat) => (
        <section key={cat.titel} className="section">
          <div className="container-page max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-forest-900">
              {cat.titel}
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed">{cat.intro}</p>
            <Card className="mt-6">
              <ol className="space-y-6">
                {cat.boeken.map((b) => (
                  <li key={b.titel} className="text-sm leading-relaxed">
                    <span className="text-ink-700">
                      <span className="font-medium text-forest-900">
                        {b.auteurs} — {b.titel}
                      </span>{" "}
                      <span className="italic">({b.jaar})</span>.{" "}
                      {b.beschrijving}
                    </span>
                    <div className="mt-1.5">
                      <a
                        href={affiliateLink(b.bolUrl, b.titel)}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="text-xs font-medium text-forest-800 underline hover:text-forest-700"
                      >
                        Bekijk op bol.com →
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </section>
      ))}

      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <Card className="border-amber-200 bg-amber-50">
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
              Medisch voorbehoud
            </h2>
            <p className="text-sm leading-relaxed text-ink-700">
              Deze boekenlijst is bedoeld ter algemene voorlichting en is geen
              vervanging van individueel medisch of dietistisch advies. Zie
              ook onze{" "}
              <a href="/medisch-voorbehoud" className="underline">
                pagina medisch voorbehoud
              </a>
              . Links naar bol.com zijn affiliate-links: bij een aankoop via
              deze links ontvangt Low Carb Netherlands mogelijk een kleine
              vergoeding, zonder meerkosten voor jou.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
