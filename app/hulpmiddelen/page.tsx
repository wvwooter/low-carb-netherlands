import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hulpmiddelen",
  description:
    "Hulpmiddelen om glucose en ketonen te meten: continue glucosemonitoring, teststrips, meters en lancetten.",
  ...canonical("/hulpmiddelen"),
};

interface Hulpmiddel {
  naam: string;
  merk: string;
  beschrijving: string;
  bolUrl: string;
}

interface Categorie {
  titel: string;
  intro: string;
  items: Hulpmiddel[];
}

const BOL_AFFILIATE_ID = "1532849";
const BOL_AFFILIATE_FLAG = "TXL";

// LET OP (tijdelijk): bol.com's eigen affiliate-redirect (partner.bol.com)
// geeft momenteel voor alle producten "Access Denied" terug -- een storing
// aan bol.com's kant, gereproduceerd los van onze site. Tot dat is
// opgelost linken we rechtstreeks naar de productpagina, zonder de kapotte
// redirect. Zodra bol.com het weer werkend heeft, kan onderstaande functie
// teruggezet worden naar de partner.bol.com-variant (zie git-historie, of
// de gelijke fix in app/boeken/page.tsx).
function affiliateLink(bolUrl: string, _naam: string) {
  return bolUrl;
}

const CATEGORIEEN: Categorie[] = [
  {
    titel: "Continue glucosemonitoring",
    intro:
      "Een sensor die de hele dag automatisch je glucosewaarden bijhoudt, zonder vingerprikken.",
    items: [
      {
        naam: "FreeStyle Libre 2 Sensor",
        merk: "Abbott",
        beschrijving:
          "Meet glucose zonder vingerprikken. Een sensor gaat 14 dagen mee en wordt uitgelezen met de FreeStyle Libre-reader of -app.",
        bolUrl: "https://www.bol.com/nl/nl/p/freestyle-libre-2-sensor/9300000169487768/",
      },
    ],
  },
  {
    titel: "Bloedmeten: glucose en ketonen",
    intro:
      "Voor wie liever (of aanvullend) met vingerprikjes meet: een meter, teststrips en lancetten die op elkaar aansluiten.",
    items: [
      {
        naam: "FreeStyle Precision Neo (startpakket)",
        merk: "Abbott",
        beschrijving:
          "Compacte meter die met de juiste teststrips zowel bloedglucose als bloedketonen meet.",
        bolUrl: "https://www.bol.com/nl/nl/p/freestyle-precision-neo-startpakket/9200000113024194/",
      },
      {
        naam: "FreeStyle Precision B-Ketonen teststrips (10 stuks)",
        merk: "Abbott",
        beschrijving:
          "Teststrips voor het meten van bloedketonen, compatibel met de FreeStyle Precision Neo.",
        bolUrl:
          "https://www.bol.com/nl/p/freestyle-precision-b-ketonen-10-strips/9200000118382713/",
      },
      {
        naam: "FreeStyle lancetten 28G (200 stuks)",
        merk: "Abbott",
        beschrijving:
          "Lancetten voor de vingerprik bij bloedglucose- en bloedketonmetingen, met instelbare prikdiepte.",
        bolUrl: "https://www.bol.com/nl/nl/p/abbott-freedom-lancetten/9200000028786698/",
      },
    ],
  },
];

export default function HulpmiddelenPage() {
  return (
    <>
      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Hulpmiddelen
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Hulpmiddelen om glucose en ketonen te meten en zo inzicht te
            krijgen in hoe je lichaam op voeding reageert. Handig bij een
            koolhydraatarme leefstijl, en voor mensen met (pre)diabetes vaak
            een waardevolle aanvulling op de begeleiding van hun zorgverlener.
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
              <ol className="space-y-6">
                {cat.items.map((item) => (
                  <li key={item.naam} className="text-sm leading-relaxed">
                    <span className="text-ink-700">
                      <span className="font-medium text-forest-900">
                        {item.naam}
                      </span>{" "}
                      <span className="italic">({item.merk})</span>.{" "}
                      {item.beschrijving}
                    </span>
                    <div className="mt-1.5">
                      <a
                        href={affiliateLink(item.bolUrl, item.naam)}
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
              Deze hulpmiddelen zijn bedoeld voor zelfmonitoring en algemene
              voorlichting, en vervangen geen diagnose, behandeling of advies
              van een arts of diabetesverpleegkundige. Gebruik je medicatie
              die je bloedsuiker beinvloedt (zoals insuline), overleg dan
              altijd met je zorgverlener voordat je op basis van deze
              metingen iets aan je behandeling verandert. Zie ook onze{" "}
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
