import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Podcasts",
  description:
    "Aanbevolen podcasts over metabole gezondheid, insulineresistentie en koolhydraatarm eten: The Metabolic Link, The Metabolic Classroom, Stay Off My Operating Table en Healthy you - Happy you.",
  ...canonical("/podcasts"),
};

interface Podcast {
  titel: string;
  presentator: string;
  taal: "Engels" | "Nederlands";
  beschrijving: string;
  links: { label: string; url: string }[];
}

const PODCASTS: Podcast[] = [
  {
    titel: "The Metabolic Link",
    presentator: "Dr. Dominic D'Agostino, Dr. Angela Poff en Victoria Field",
    taal: "Engels",
    beschrijving:
      "Een medische en wetenschappelijke podcast die de gemeenschappelijke rode draad van metabolisme in gezondheid en ziekte onderzoekt. De presentatoren bespreken actueel onderzoek naar metabole gezondheid en -therapie samen met vooraanstaande experts uit het vakgebied. Een productie van de Metabolic Health Summit.",
    links: [
      { label: "Spotify", url: "https://open.spotify.com/show/59ExyA5s9LLC1jYHXLFi3e" },
      { label: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/the-metabolic-link/id1666125722" },
    ],
  },
  {
    titel: "The Metabolic Classroom",
    presentator: "Dr. Ben Bikman",
    taal: "Engels",
    beschrijving:
      "Een voedings- en leefstijlpodcast over metabolisme: hoe ons lichaam energie gebruikt en waarom we ziek en dik worden. Insulineresistentie-onderzoeker Ben Bikman deelt wekelijks inzichten die direct toepasbaar zijn, met koolhydraatbeperking als rode draad om insuline te verlagen.",
    links: [
      { label: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/the-metabolic-classroom-with-dr-ben-bikman/id1553952528" },
      { label: "Audible", url: "https://www.audible.com/podcast/The-Metabolic-Classroom/B08K56WXHT" },
    ],
  },
  {
    titel: "Stay Off My Operating Table",
    presentator: "Dr. Philip Ovadia",
    taal: "Engels",
    beschrijving:
      "Cardiochirurg Philip Ovadia verloor zelf 45 kilo en gooide daarna zijn kijk op voeding radicaal om. In deze podcast bespreekt hij hart- en vaatziekten, gangbare voedingsmythes en hoe metabole gezondheid en leefstijl mensen letterlijk van de operatietafel weghouden.",
    links: [
      { label: "Spotify", url: "https://open.spotify.com/show/0UnefbKkO2ZhhnNlIrrYtL" },
      { label: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/stay-off-my-operating-table/id1587212660" },
    ],
  },
  {
    titel: "Healthy you - Happy you | Koolhydraatarm & Gezond Leven",
    presentator: "Noor Struik (The Nourishing State)",
    taal: "Nederlands",
    beschrijving:
      "Diëtist en voedingswetenschapper Noor Struik deelt iedere week alles rondom keto en koolhydraatarme voeding, afvallen, mindset en een gezonde leefstijl. De enige Nederlandstalige podcast in dit rijtje, en daarmee een fijne aanvulling voor wie liever in het Nederlands luistert.",
    links: [
      { label: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/healthy-you-happy-you-koolhydraatarm-gezond-leven/id1603056126" },
      { label: "Website", url: "https://www.thenourishingstate.com/" },
    ],
  },
];

export default function PodcastsPage() {
  return (
    <>
      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Podcasts
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Een selectie podcasts over metabole gezondheid, insulineresistentie
            en koolhydraatarm eten, gemaakt door artsen, onderzoekers en
            diëtisten. Handig om onderweg of tijdens het koken bij te blijven.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="space-y-6">
            {PODCASTS.map((podcast) => (
              <Card key={podcast.titel}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-serif text-xl font-semibold text-forest-900">
                    {podcast.titel}
                  </h2>
                  <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-800">
                    {podcast.taal}
                  </span>
                </div>
                <p className="mt-1 text-sm italic text-ink-600">
                  {podcast.presentator}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {podcast.beschrijving}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {podcast.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-forest-800 underline hover:text-forest-700"
                    >
                      Beluister op {link.label} →
                    </a>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <Card className="border-amber-200 bg-amber-50">
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
              Medisch voorbehoud
            </h2>
            <p className="text-sm leading-relaxed text-ink-700">
              Deze podcasts zijn bedoeld als algemene voorlichting en inspiratie,
              niet als medisch advies. Low Carb Netherlands is niet verantwoordelijk
              voor de inhoud van deze externe producties. Overleg bij vragen over
              je gezondheid of medicatie altijd met je eigen arts of zorgverlener.
              Zie ook onze{" "}
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
