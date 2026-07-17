import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="17 juli 2026 (concept)">
      <p>
        De inhoud van Low Carb Netherlands is met zorg samengesteld, maar we
        kunnen geen garanties geven over de volledigheid, juistheid of
        actualiteit van de informatie.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Geen medisch advies</h2>
      <p>
        Informatie op dit platform is uitsluitend bedoeld ter algemene
        voorlichting en vormt geen vervanging van professioneel medisch,
        diëtistisch of ander advies. Raadpleeg altijd een gekwalificeerde
        zorgverlener voor individueel advies.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Professionalsprofielen</h2>
      <p>
        Vermelding van een professional in onze verwijsgids is geen
        garantie voor de kwaliteit van diens dienstverlening. Low Carb
        Netherlands is niet aansprakelijk voor de inhoud van geleverde zorg
        door vermelde professionals.
      </p>
    </LegalPage>
  );
}
