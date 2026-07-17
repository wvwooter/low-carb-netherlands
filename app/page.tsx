import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { EventCard } from "@/components/events/EventCard";
import { MOCK_PROFESSIONALS } from "@/lib/mock-data/professionals";
import { MOCK_ARTICLES } from "@/lib/mock-data/articles";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants";

const AUDIENCES = [
  { title: "Patiënten & geïnteresseerden", text: "Betrouwbare, begrijpelijke informatie over koolhydraatbeperking en metabole gezondheid." },
  { title: "Artsen & specialisten", text: "Wetenschappelijke achtergrond en aansluiting bij vakgenoten met low-carb ervaring." },
  { title: "Diëtisten & leefstijlprofessionals", text: "Praktijkkennis, scholing en zichtbaarheid richting nieuwe cliënten." },
  { title: "Onderzoekers & organisaties", text: "Een podium voor onderzoek en samenwerking rond metabole gezondheid." },
];

export default function HomePage() {
  return (
    <>
      <section className="section bg-gradient-to-b from-forest-50 to-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-amber-50 px-3.5 py-1 text-xs font-medium text-amber-700">
              In opbouw — eerste versie
            </span>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-forest-900 sm:text-5xl">
              {SITE_TAGLINE}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
              {SITE_DESCRIPTION}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/professionals" size="lg">
                Vind een professional
              </LinkButton>
              <LinkButton href="/aanmelden" variant="outline" size="lg">
                Meld je aan als professional
              </LinkButton>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
              <LinkButton href="/artikelen" variant="ghost" size="sm">
                Lees de artikelen →
              </LinkButton>
              <LinkButton href="/over-ons" variant="ghost" size="sm">
                Over Low Carb Netherlands →
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-forest-900 sm:text-3xl">
            Voor wie is dit platform?
          </h2>
          <p className="mb-10 max-w-2xl text-ink-700">
            Low Carb Netherlands verbindt iedereen die serieus bezig is met
            koolhydraatbeperking en metabole gezondheid — van patiënt tot
            onderzoeker.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a) => (
              <Card key={a.title}>
                <h3 className="mb-2 font-serif text-lg font-semibold text-forest-900">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-700">{a.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest-900 text-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
              Waarom metabole gezondheid ertoe doet
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-forest-100/90">
              Insulineresistentie speelt een rol bij een groot deel van de
              chronische aandoeningen in Nederland — van diabetes type 2 tot
              obesitas en hart- en vaatziekten. Koolhydraatbeperking kan, mits
              goed begeleid, een waardevolle behandelstrategie zijn. Low Carb
              Netherlands brengt de wetenschap, de zorg en de praktijk
              samen.
            </p>
            <LinkButton href="/over-ons" variant="secondary" className="mt-6">
              Lees meer over ons
            </LinkButton>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-wide text-amber-300">
              Binnenkort op het platform
            </p>
            <ul className="mt-4 space-y-3 text-sm text-forest-100/90">
              <li>— Verwijsgids van medische en paramedische professionals</li>
              <li>— Wetenschappelijk onderbouwde artikelen</li>
              <li>— Congressen, webinars en nascholing</li>
              <li>— Video&apos;s en lezingen</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-semibold text-forest-900 sm:text-3xl">
              Uitgelichte professionals
            </h2>
            <LinkButton href="/professionals" variant="ghost" size="sm">
              Alle professionals →
            </LinkButton>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_PROFESSIONALS.map((p) => (
              <ProfessionalCard key={p.id} professional={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest-50/40">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-semibold text-forest-900 sm:text-3xl">
              Recente artikelen
            </h2>
            <LinkButton href="/artikelen" variant="ghost" size="sm">
              Alle artikelen →
            </LinkButton>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_ARTICLES.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl font-semibold text-forest-900 sm:text-3xl">
              Aankomende evenementen
            </h2>
            <LinkButton href="/evenementen" variant="ghost" size="sm">
              Alle evenementen →
            </LinkButton>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_EVENTS.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-amber-50">
        <div className="container-page flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-forest-900">
              Ben je professional en werk je met low-carb?
            </h2>
            <p className="mt-2 max-w-xl text-ink-700">
              Meld je aan voor de verwijsgids. Profielen worden zorgvuldig
              beoordeeld voordat ze zichtbaar worden.
            </p>
          </div>
          <LinkButton href="/aanmelden" size="lg">
            Meld je aan als professional
          </LinkButton>
        </div>
      </section>
    </>
  );
}
