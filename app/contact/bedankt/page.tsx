import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/Button";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bedankt voor je bericht",
  robots: { index: false, follow: true },
  ...canonical("/contact/bedankt"),
};

export default function ContactBedanktPage() {
  return (
    <section className="section">
      <div className="container-page max-w-xl text-center">
        <h1 className="font-serif text-3xl font-semibold text-forest-900">
          Bedankt voor je bericht
        </h1>
        <p className="mt-4 leading-relaxed text-ink-700">
          We nemen zo snel mogelijk contact met je op.
        </p>
        <LinkButton href="/" className="mt-8">
          Terug naar de homepage
        </LinkButton>
      </div>
    </section>
  );
}
