import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { EventCard } from "@/components/events/EventCard";
import { HeroGraphic } from "@/components/home/HeroGraphic";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { MOCK_PROFESSIONALS } from "@/lib/mock-data/professionals";
import { MOCK_ARTICLES } from "@/lib/mock-data/articles";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants";

const AUDIENCES = [
  {
    title: "Patiënten & geïnteresseerden",
    text: "Betrouwbare, begrijpelijke informatie over koolhydraatbeperking en metabole gezondheid.",
    icon: (
      <path
        d="M12 21c-4-3-8-6.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.5-4 8-8 11H12Z"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Artsen & specialisten",
    text: "Wetenschappelijke achtergrond en aansluiting bij vakgenoten met low-carb ervaring.",
    icon: (
      <path
        d="M9 3v5a3 3 0 0 0 6 0V3M9 3H7v6a5 5 0 0 0 10 0V3h-2M12 14v7m-4 0h8"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Diëtisten & leefstijlprofessionals",
    text: "Praktijkkennis, scholing en zichtbaarheid richting nieuwe cliënten.",
    icon: (
      <path
        d="M4 13c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.4 0-2.7-.4-3.9-1L4 21l1-4.1C4.4 15.7 4 14.4 4 13Z"
        strokeWidth="1.8"
      />
    ),
  },
  {
    title: "Onderzoekers & organisaties",
    text: "Een podium voor onderzoek en samenwerking rond metabole gezondheid.",
    icon: (
      <path
        d="M9 4h6l1 4h3v3l-4 9H8L4 11V8h3l1-4h1Z M9 8h6"
        strokeWidth="1.8"
      />
    ),
  },
];

const POPULAR = [
  {
    title: "Vind een professional",
    text: "Doorzoek de verwijsgids op regio en specialisatie.",
    href: "/professionals",
    cta: "Naar de verwijsgids",
    tone: "forest" as const,
  },
  {
    title: "Artikelen & wetenschap",
    text: "Achtergrondverhalen, onderzoek en praktijkervaring rond low-carb.",
    href: "/artikelen",
    cta: "Lees de artikelen",
    tone: "amber" as const,
  },
  {
    title: "Video's & lezingen",
    text: "Uitleg en interviews over koolhydraatbeperking en metabole gezondheid.",
    href: "/videos",
    cta: "Bekijk video's",
    tone: "forestLight" as const,
  },
];

const toneClasses = {
  forest: "bg-forest-800 text-white",
  amber: "bg-amber-400 text-forest-900",
  forestLight: "bg-forest-100 text-forest-900",
} as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden section bg-gradient-to-b from-forest-50 to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-forest-100/70 blur-2xl" />
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-2">
          <div className="max-w-xl">
            <span className="mb-4 inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-medium text-amber-700">
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
          <div className="hidden justify-self-center lg:flex">
            <HeroGraphic />
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
              <Card key={a.title} className="group">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors group-hover:bg-forest-800 group-hover:text-white">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {a.icon}
                  </svg>
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-forest-900">
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-700">{a.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-forest-900 sm:text-3xl">
            Populair op het platform
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {POPULAR.map((p) => (
              <div
                key={p.title}
                className={`flex flex-col justify-between rounded-2xl p-7 shadow-card transition-transform hover:-translate-y-1 hover:shadow-cardHover ${toneClasses[p.tone]}`}
              >
                <div>
                  <h3 className="font-serif text-xl font-semibold">{p.title}</h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      p.tone === "amber" ? "text-forest-800" : "text-white/85"
                    } ${p.tone === "forestLight" ? "!text-forest-800" : ""}`}
                  >
                    {p.text}
                  </p>
                </div>
                <LinkButton
                  href={p.href}
                  variant={p.tone === "amber" ? "outline" : "outline"}
                  size="sm"
                  className={
                    p.tone === "amber"
                      ? "mt-6 self-start border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-white"
                      : p.tone === "forestLight"
                        ? "mt-6 self-start border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-white"
                        : "mt-6 self-start border-white text-white hover:bg-white hover:text-forest-900"
                  }
                >
                  {p.cta} →
                </LinkButton>
              </div>
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

      <section className="section bg-forest-50/40">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-semibold text-forest-900 sm:text-3xl">
              Veelgestelde vragen
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-700">
              Een paar basisvragen over low-carb, voor wie er nieuw mee kennismaakt.
            </p>
          </div>
          <FaqAccordion />
          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-ink-500">
            Informatie op dit platform vervangt geen individueel medisch advies.
            Overleg wijzigingen in voeding of medicatie altijd met een arts of
            diëtist.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden section bg-amber-50">
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-amber-200/50 blur-2xl" />
        <div className="container-page relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
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
