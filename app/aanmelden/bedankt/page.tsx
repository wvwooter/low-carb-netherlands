import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bedankt voor je aanmelding",
  robots: { index: false, follow: true },
};

export default function BedanktPage() {
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-forest-800">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-forest-900">
          Bedankt voor je aanmelding
        </h1>
        <p className="mt-4 leading-relaxed text-ink-700">
          We hebben je aanmelding ontvangen en beoordelen deze zorgvuldig.
          Je ontvangt een bevestiging per e-mail. Zodra je profiel is
          goedgekeurd, nemen we contact met je op en wordt het zichtbaar in
          de verwijsgids.
        </p>
        <LinkButton href="/" className="mt-8">
          Terug naar de homepage
        </LinkButton>
      </div>
    </section>
  );
}
