import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Wetenschappelijke bronnen",
  description:
    "Een selectie van wetenschappelijke literatuur over koolhydraatbeperking, voor professionals en geïnteresseerden.",
};

interface Bron {
  auteurs: string;
  titel: string;
  bron: string;
  url: string;
}

interface Categorie {
  titel: string;
  intro: string;
  bronnen: Bron[];
}

const CATEGORIEEN: Categorie[] = [
  {
    titel: "Algemene overzichten & reviews",
    intro:
      "Introducerende artikelen en reviews die een breed beeld geven van koolhydraatbeperking als voedingsstrategie: wat er bekend is, welke misverstanden er bestaan en hoe de wetenschap zich verhoudt tot andere voedingspatronen.",
    bronnen: [
      {
        auteurs: "Dynka, D. et al. (2025)",
        titel: "Ketogenic Diets for Body Weight Loss: A Comparison with Other Diets",
        bron: "Nutrients, 17(6), 965",
        url: "https://doi.org/10.3390/nu17060965",
      },
      {
        auteurs: "Rice, S.M. en Reynolds, D.B. (2025)",
        titel:
          "Practical guidelines for addressing common questions and misconceptions about the ketogenic diet",
        bron: "Journal of Metabolic Health, 8(1), 10",
        url: "https://doi.org/10.4102/jmh.v8i1.113",
      },
      {
        auteurs: "Skartun, O. et al. (2025)",
        titel:
          "Symptoms during initiation of a ketogenic diet: a scoping review of occurrence rates, mechanisms and relief strategies",
        bron: "Frontiers in Nutrition, 12",
        url: "https://doi.org/10.3389/fnut.2025.1538266",
      },
      {
        auteurs: "Teicholz, N. et al. (2025)",
        titel: "Myths and Facts Regarding Low-Carbohydrate Diets",
        bron: "Nutrients, 17(6), 1047",
        url: "https://doi.org/10.3390/nu17061047",
      },
      {
        auteurs: "Volek, J.S. et al. (2021)",
        titel: "Alternative Dietary Patterns for Americans: Low-Carbohydrate Diets",
        bron: "Nutrients, 13(10), 3299",
        url: "https://doi.org/10.3390/nu13103299",
      },
      {
        auteurs: "Volek, J.S., Kackley, M.L. en Buga, A. (2024)",
        titel:
          "Nutritional Considerations During Major Weight Loss Therapy: Focus on Optimal Protein and a Low-Carbohydrate Dietary Pattern",
        bron: "Current Nutrition Reports",
        url: "https://doi.org/10.1007/s13668-024-00548-6",
      },
    ],
  },
  {
    titel: "Implementatie in de praktijk",
    intro:
      "Praktische richtlijnen en evaluaties voor zorgverleners die koolhydraatbeperking willen toepassen bij patienten: van het afbouwen van medicatie tot ervaringen uit de huisartsenpraktijk.",
    bronnen: [
      {
        auteurs: "Society of Metabolic Health Practitioners",
        titel: "Clinical Guidelines",
        bron: "Hite et al.",
        url: "https://www.metabolicpractitioners.org/clinical-guidelines/",
      },
      {
        auteurs: "Cucuzzella, M., Riley, K. en Isaacs, D. (2021)",
        titel: "Adapting Medication for Type 2 Diabetes to a Low Carbohydrate Diet",
        bron: "Frontiers in Nutrition",
        url: "https://doi.org/10.3389/fnut.2021.688540",
      },
      {
        auteurs: "Murdoch, C., Unwin, D., Cavan, D., Cucuzzella, M. en Patel, M. (2019)",
        titel:
          "Adapting diabetes medication for low carbohydrate management of type 2 diabetes: a practical guide",
        bron: "British Journal of General Practice, 69(684), 360-361",
        url: "https://doi.org/10.3399/bjgp19X704525",
      },
      {
        auteurs: "Kelly, T., Unwin, D. en Finucane, F. (2020)",
        titel:
          "Low-Carbohydrate Diets in the Management of Obesity and Type 2 Diabetes: A Review from Clinicians Using the Approach in Practice",
        bron: "International Journal of Environmental Research and Public Health, 17(7), 2557",
        url: "https://doi.org/10.3390/ijerph17072557",
      },
      {
        auteurs: "Unwin, D. et al. (2020)",
        titel:
          "Insights from a general practice service evaluation supporting a lower carbohydrate diet in patients with type 2 diabetes mellitus and prediabetes",
        bron: "BMJ Nutrition, Prevention & Health, 3(2)",
        url: "https://doi.org/10.1136/bmjnph-2020-000072",
      },
      {
        auteurs: "Griauzde, D.H., Standafer Lopez, K., Saslow, L.R. en Richardson, C.R. (2021)",
        titel:
          "A Pragmatic Approach to Translating Low- and Very Low-Carbohydrate Diets Into Clinical Practice for Patients With Obesity and Type 2 Diabetes",
        bron: "Frontiers in Nutrition, 8, 682137",
        url: "https://doi.org/10.3389/fnut.2021.682137",
      },
      {
        auteurs: "Cupit, C. en Redman, E. (2021)",
        titel:
          "Supporting people to implement a reduced carbohydrate diet: a qualitative study in family practice",
        bron: "BMJ Nutrition, Prevention & Health",
        url: "https://doi.org/10.1136/bmjnph-2021-000240",
      },
    ],
  },
];

export default function BronnenPage() {
  return (
    <>
      <section className="section bg-forest-50/40">
        <div className="container-page max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Wetenschappelijke bronnen
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            Een selectie van wetenschappelijke literatuur over
            koolhydraatbeperking, bedoeld als startpunt voor professionals en
            geinteresseerden die verder willen lezen. Deze lijst is niet
            uitputtend en wordt regelmatig aangevuld.
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
                {cat.bronnen.map((b) => (
                  <li key={b.url} className="text-sm leading-relaxed">
                    <span className="text-ink-700">
                      {b.auteurs} —{" "}
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-medium text-forest-800 underline hover:text-forest-700"
                      >
                        {b.titel}
                      </a>
                      . <span className="italic">{b.bron}</span>.
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
          <Card>
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
              Meer verdieping
            </h2>
            <p className="text-sm leading-relaxed text-ink-700">
              Op zoek naar een breder, internationaal overzicht van de
              onderzoeksliteratuur? De{" "}
              <a
                href="https://nutrition-network.org/research/general-resources/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline"
              >
                research-pagina van Nutrition Network
              </a>{" "}
              biedt een uitgebreide, doorlopend bijgewerkte bibliografie
              (Engelstalig, sterk klinisch georienteerd) en diende mede als
              inspiratie voor deze selectie.
            </p>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <Card className="border-amber-200 bg-amber-50">
            <h2 className="mb-2 font-serif text-lg font-semibold text-forest-900">
              Medisch voorbehoud
            </h2>
            <p className="text-sm leading-relaxed text-ink-700">
              Deze bronnenlijst is bedoeld ter algemene voorlichting en is
              geen vervanging van individueel medisch of dietistisch advies.
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
