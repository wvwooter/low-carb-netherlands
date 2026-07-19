import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  ...canonical("/algemene-voorwaarden"),
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalPage title="Algemene voorwaarden" updated="17 juli 2026 (concept)">
      <h2 className="font-serif text-xl font-semibold text-forest-900">Toepasselijkheid</h2>
      <p>
        Deze voorwaarden zijn van toepassing op het gebruik van het platform
        Low Carb Netherlands, inclusief de verwijsgids, artikelen,
        evenementenoverzicht en aanmeldformulieren.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Gebruik door professionals</h2>
      <p>
        Professionals die zich aanmelden voor de verwijsgids garanderen dat
        de opgegeven gegevens, waaronder beroepsregistratie, juist en
        actueel zijn. Low Carb Netherlands behoudt zich het recht voor
        profielen te weigeren, aan te passen of te verwijderen.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Aansprakelijkheid</h2>
      <p>
        Low Carb Netherlands aanvaardt geen aansprakelijkheid voor schade
        die voortvloeit uit het gebruik van informatie op het platform of
        uit contact met vermelde professionals.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Wijzigingen</h2>
      <p>We kunnen deze voorwaarden van tijd tot tijd aanpassen.</p>
    </LegalPage>
  );
}
