import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  robots: { index: true, follow: true },
};

export default function PrivacyverklaringPage() {
  return (
    <LegalPage title="Privacyverklaring" updated="17 juli 2026 (concept)">
      <p>
        Low Carb Netherlands hecht waarde aan de bescherming van je
        persoonsgegevens. In deze privacyverklaring leggen we uit welke
        gegevens we verzamelen, waarom, en hoe we daarmee omgaan conform de
        Algemene Verordening Gegevensbescherming (AVG/GDPR).
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Welke gegevens verzamelen we</h2>
      <p>
        Afhankelijk van hoe je het platform gebruikt, kunnen we de volgende
        gegevens verwerken: naam, e-mailadres, telefoonnummer,
        praktijkgegevens (bij professionalsaanmelding), berichten via het
        contactformulier, en nieuwsbriefaanmeldingen. We verzamelen alleen
        gegevens die noodzakelijk zijn voor het betreffende doel.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Geen medische patiëntgegevens</h2>
      <p>
        Onze formulieren zijn niet bedoeld voor het delen van persoonlijke
        medische gegevens of voor het aanvragen van individuele medische
        consulten. Deel dergelijke informatie niet via onze formulieren.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Bewaartermijn</h2>
      <p>
        We bewaren gegevens niet langer dan noodzakelijk voor het doel
        waarvoor ze zijn verzameld, of zolang de wet dit vereist.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Jouw rechten</h2>
      <p>
        Je hebt recht op inzage, correctie, verwijdering en overdraagbaarheid
        van je gegevens. Neem hiervoor contact met ons op via het
        contactformulier.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Beveiliging</h2>
      <p>
        We nemen passende technische en organisatorische maatregelen om je
        gegevens te beschermen tegen verlies of onrechtmatig gebruik.
      </p>
    </LegalPage>
  );
}
