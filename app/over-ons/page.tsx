import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Waarom Low Carb Netherlands is opgericht en waar het platform voor staat.",
  ...canonical("/over-ons"),
};

const PIJLERS = [
  {
    title: "Wetenschappelijk onderbouwd",
    text: "We baseren informatie op beschikbare wetenschappelijke inzichten en zijn transparant over wat wel en niet bewezen is.",
  },
  {
    title: "Multidisciplinair",
    text: "Artsen, diëtisten, fysiotherapeuten en andere professionals werken vanuit verschillende invalshoeken aan hetzelfde doel.",
  },
  {
    title: "Onafhankelijk",
    text: "Low Carb Netherlands is geen commercieel dieetmerk. We verkopen geen producten en doen geen wondermiddel-claims.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Over Low Carb Netherlands
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Low Carb Netherlands is opgericht vanuit de overtuiging dat
            koolhydraatbeperking een waardevolle, wetenschappelijk
            onderbouwde behandelstrategie kan zijn bij insulineresistentie en
            aanverwante metabole aandoeningen — en dat mensen in Nederland
            nog te weinig toegang hebben tot betrouwbare informatie en
            deskundige begeleiding hierover.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl space-y-6 text-ink-700">
          <h2 className="font-serif text-2xl font-semibold text-forest-900">
            Waarom dit platform nodig is
          </h2>
          <p className="leading-relaxed">
            Een groot deel van de meest voorkomende chronische aandoeningen
            in Nederland — waaronder diabetes type 2, obesitas en
            verschillende hart- en vaatziekten — hangt samen met
            insulineresistentie. Leefstijlfactoren als voeding, beweging,
            slaap en stress spelen hierin een belangrijke rol.
          </p>
          <p className="leading-relaxed">
            Koolhydraatbeperking is één van de strategieën die, bij bepaalde
            mensen en onder de juiste begeleiding, kan bijdragen aan
            verbeterde metabole gezondheid. Dit vraagt om zorgvuldige,
            individuele afweging — en om professionals die hier ervaring
            mee hebben.
          </p>
          <p className="leading-relaxed">
            Low Carb Netherlands wil daarom de samenwerking tussen medische
            en paramedische professionals bevorderen, en het voor patiënten
            en geïnteresseerden makkelijker maken om betrouwbare informatie
            en de juiste begeleiding te vinden.
          </p>
        </div>
      </section>

      <section className="section bg-forest-50/40">
        <div className="container-page">
          <h2 className="mb-8 font-serif text-2xl font-semibold text-forest-900">
            Waar we voor staan
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {PIJLERS.map((p) => (
              <Card key={p.title}>
                <h3 className="mb-2 font-serif text-lg font-semibold text-forest-900">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-700">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <Card className="border-amber-200 bg-amber-50">
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
              Medisch voorbehoud
            </h2>
            <p className="text-sm leading-relaxed text-ink-700">
              De informatie op Low Carb Netherlands is bedoeld ter algemene
              voorlichting en vervangt geen individueel medisch, diëtistisch
              of ander professioneel advies. Pas nooit zelfstandig medicatie
              of behandeling aan zonder overleg met een behandelend
              zorgverlener. Zie ook onze{" "}
              <a href="/medisch-voorbehoud" className="underline">
                pagina medisch voorbehoud
              </a>
              .
            </p>
          </Card>
        </div>
      </section>

      <section className="section bg-forest-900 text-white">
        <div className="container-page flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold">
              Doe mee met Low Carb Netherlands
            </h2>
            <p className="mt-2 max-w-xl text-forest-100/90">
              Als professional, onderzoeker of organisatie: we horen graag
              van je.
            </p>
          </div>
          <LinkButton href="/contact" variant="secondary" size="lg">
            Neem contact op
          </LinkButton>
        </div>
      </section>
    </>
  );
}
