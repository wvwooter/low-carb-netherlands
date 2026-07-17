import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Medisch voorbehoud",
};

export default function MedischVoorbehoudPage() {
  return (
    <LegalPage title="Medisch voorbehoud" updated="17 juli 2026 (concept)">
      <p>
        De informatie op Low Carb Netherlands, inclusief artikelen,
        video&apos;s en professionalsprofielen, is bedoeld ter algemene
        informatie en educatie. Het is nadrukkelijk geen vervanging voor
        individueel medisch advies, diagnose of behandeling.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Raadpleeg altijd een zorgverlener</h2>
      <p>
        Pas nooit zelfstandig medicatie of behandeling aan op basis van
        informatie op dit platform. Overleg altijd met je behandelend arts,
        diëtist of andere zorgverlener, zeker bij gebruik van
        bloedsuikerverlagende medicatie of insuline.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Geen garanties</h2>
      <p>
        Low Carb Netherlands doet geen uitspraken die het genezen van
        aandoeningen garanderen. Individuele resultaten kunnen sterk
        variëren.
      </p>
    </LegalPage>
  );
}
