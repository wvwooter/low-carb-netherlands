import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  ...canonical("/cookiebeleid"),
};

export default function CookiebeleidPage() {
  return (
    <LegalPage title="Cookiebeleid" updated="17 juli 2026 (concept)">
      <p>
        Low Carb Netherlands gebruikt functionele cookies die noodzakelijk
        zijn voor het goed functioneren van de website. Voor analytics
        gebruiken we een privacyvriendelijke, cookieloze of
        cookie-arme oplossing die geen individueel herleidbare profielen
        opbouwt.
      </p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Functionele cookies</h2>
      <p>Noodzakelijk voor basisfunctionaliteit, zoals het onthouden van je voorkeuren.</p>
      <h2 className="font-serif text-xl font-semibold text-forest-900">Analytische gegevens</h2>
      <p>
        We gebruiken geanonimiseerde, geaggregeerde statistieken om het
        platform te verbeteren, zonder individuele bezoekers te volgen.
      </p>
    </LegalPage>
  );
}
