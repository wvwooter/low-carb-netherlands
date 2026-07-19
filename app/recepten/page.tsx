import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recepten",
  description:
    "Koolhydraatarme recepten: doorverwijzingen naar Low Carb Chef en Low Carb Down Under, voor wie op zoek is naar inspiratie in de keuken.",
  ...canonical("/recepten"),
};

interface RecipeCategory {
  naam: string;
  url: string;
}

interface RecipeSite {
  naam: string;
  land: string;
  beschrijving: string;
  url: string;
  categorieen?: RecipeCategory[];
}

const SITES: RecipeSite[] = [
  {
    naam: "Low Carb Chef",
    land: "Nederland",
    beschrijving:
      "Een uitgebreide Nederlandstalige verzameling koolhydraatarme recepten, ingedeeld naar gang en soort gerecht: van ontbijt en lunch tot hoofdgerecht en dessert, met weekmenu's en een kookboek.",
    url: "https://www.lowcarbchef.nl",
    categorieen: [
      { naam: "Ontbijt", url: "https://www.lowcarbchef.nl/recepten/ontbijt/" },
      { naam: "Lunch", url: "https://www.lowcarbchef.nl/recepten/lunch/" },
      { naam: "Hoofdgerecht", url: "https://www.lowcarbchef.nl/recepten/hoofdgerecht/" },
      { naam: "Snacks", url: "https://www.lowcarbchef.nl/recepten/snacks/" },
      { naam: "Dessert", url: "https://www.lowcarbchef.nl/recepten/dessert/" },
      { naam: "Weekmenu's", url: "https://www.lowcarbchef.nl/weekmenus/" },
    ],
  },
  {
    naam: "Low Carb Down Under",
    land: "Australie",
    beschrijving:
      "De Engelstalige recepten-archief van Low Carb Down Under, de Australische stichting achter internationale congressen over koolhydraatbeperking en metabole gezondheid.",
    url: "https://lowcarbdownunder.com.au/recipes",
  },
];

export default function ReceptenPage() {
  return (
    <>
      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Recepten
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Low Carb Netherlands publiceert zelf geen recepten, maar
            verwijst je graag door naar bronnen die dat wel goed doen. Hieronder
            vind je twee sites met koolhydraatarme recepten, met dank aan hun
            makers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl space-y-6">
          {SITES.map((site) => (
            <Card key={site.naam}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="font-serif text-2xl font-semibold text-forest-900">
                  {site.naam}
                </h2>
                <span className="text-xs font-medium uppercase tracking-wide text-ink-500">
                  {site.land}
                </span>
              </div>
              <p className="mt-3 text-ink-700 leading-relaxed">
                {site.beschrijving}
              </p>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-800 underline hover:text-forest-700"
              >
                Bekijk recepten op {new URL(site.url).hostname.replace(/^www\./, "")} →
              </a>
              {site.categorieen && site.categorieen.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4">
                  {site.categorieen.map((cat) => (
                    <a
                      key={cat.naam}
                      href={cat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-ink-200 px-3 py-1 text-xs font-medium text-ink-700 hover:border-forest-300 hover:text-forest-800"
                    >
                      {cat.naam}
                    </a>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <Card className="border-amber-200 bg-amber-50">
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
              Vermelding
            </h2>
            <p className="text-sm leading-relaxed text-ink-700">
              De recepten op deze pagina&apos;s zijn eigendom van Low Carb Chef en
              Low Carb Down Under. Low Carb Netherlands is niet betrokken bij
              het samenstellen ervan en linkt alleen door ter inspiratie. Zie
              ook onze{" "}
              <a href="/medisch-voorbehoud" className="underline">
                pagina medisch voorbehoud
              </a>{" "}
              als je vanwege een medische aandoening je voeding aanpast.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
