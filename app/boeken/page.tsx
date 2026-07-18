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
}

interface Categorie {
  titel: string;
  intro: string;
  boeken: Boek[];
}

function bolLink(titel: string, auteurs: string) {
  const query = encodeURIComponent(`${titel} ${auteurs}`);
  return `https://www.bol.com/nl/nl/s/?searchtext=${query}`;
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
      },
      {
        auteurs: "Gary Taubes",
        titel: "The Case Against Sugar",
        jaar: "2016",
        beschrijving:
          "Onderzoek naar de rol van suiker in de opkomst van obesitas, diabetes type 2 en andere chronische ziekten.",
      },
      {
        auteurs: "Nina Teicholz",
        titel: "The Big Fat Surprise",
        jaar: "2014",
        beschrijving:
          "Onderzoeksjournalistiek over hoe verzadigd vet decennialang ten onrechte als hoofdoorzaak van hartziekten werd aangewezen.",
      },
      {
        auteurs: "Benjamin Bikman",
        titel: "Why We Get Sick",
        jaar: "2020",
        beschrijving:
          "Uitleg door een metabolisme-onderzoeker over insulineresistentie als gemeenschappelijke wortel van veel chronische ziekten.",
      },
      {
        auteurs: "William Davis",
        titel: "Wheat Belly",
        jaar: "2011",
        beschrijving:
          "Cardioloog William Davis over de effecten van moderne tarweconsumptie op gewicht en gezondheid.",
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
      },
      {
        auteurs: "Jason Fung",
        titel: "The Diabetes Code",
        jaar: "2018",
        beschrijving:
          "Praktische uitleg over het voorkomen en omkeren van diabetes type 2 via voeding en leefstijl.",
      },
      {
        auteurs: "Jason Fung en Jimmy Moore",
        titel: "The Complete Guide to Fasting",
        jaar: "2016",
        beschrijving:
          "Praktische gids voor intermitterend, alternate-day en langer vasten, inclusief protocollen en veelgestelde vragen.",
      },
      {
        auteurs: "Stephen Phinney en Jeff Volek",
        titel: "The Art and Science of Low Carbohydrate Living",
        jaar: "2011",
        beschrijving:
          "Naslagwerk van twee vooraanstaande onderzoekers over de klinische toepassing van koolhydraatbeperking.",
      },
      {
        auteurs: "Stephen Phinney en Jeff Volek",
        titel: "The Art and Science of Low Carbohydrate Performance",
        jaar: "2012",
        beschrijving:
          "Vervolg gericht op koolhydraatbeperking en sportprestaties, voor sporters en coaches.",
      },
      {
        auteurs: "Eric Westman, Stephen Phinney en Jeff Volek",
        titel: "The New Atkins for a New You",
        jaar: "2010",
        beschrijving:
          "Herziene, wetenschappelijk onderbouwde versie van de Atkins-aanpak voor dagelijks gebruik.",
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
      },
      {
        auteurs: "Maria Emmerich",
        titel: "Quick & Easy Ketogenic Cooking",
        jaar: "2016",
        beschrijving:
          "Snelle, tijdbesparende ketogene recepten en menuplanning voor de dagelijkse praktijk.",
      },
      {
        auteurs: "Martina Slajerova",
        titel: "The KetoDiet Cookbook",
        jaar: "2016",
        beschrijving:
          "Meer dan 150 koolhydraatarme, vetrijke recepten, graanvrij en suikervrij.",
      },
      {
        auteurs: "Maria Emmerich",
        titel: "Keto Comfort Foods",
        jaar: "2018",
        beschrijving:
          "Bekende, herkenbare gerechten opnieuw bedacht als koolhydraatarme, ketogene versies.",
      },
    ],
  },
];

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

      {CATEGORIEEN.map((cat) => (
        <section key={cat.titel} className="section">
          <div className="container-page max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-forest-900">
              {cat.titel}
            </h2>
            <p className="mt-3 text-ink-700 leading-relaxed">{cat.intro}</p>
            <Card className="mt-6">
              <ol className="space-y-5">
                {cat.boeken.map((b) => (
                  <li key={b.titel} className="text-sm leading-relaxed">
                    <span className="text-ink-700">
                      {b.auteurs} —{" "}
                      <a
                        href={bolLink(b.titel, b.auteurs)}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-medium text-forest-800 underline hover:text-forest-700"
                      >
                        {b.titel}
                      </a>{" "}
                      <span className="italic">({b.jaar})</span>.{" "}
                      {b.beschrijving}
                    </span>
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
              .
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
