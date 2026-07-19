import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SelectField, TextField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "./actions";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Low Carb Netherlands.",
  ...canonical("/contact"),
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold text-forest-900">
          Contact
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          Vragen, samenwerkingsvoorstellen, of een evenement, artikel of
          spreker aandragen? Laat het ons weten.
        </p>

        <Card className="mt-6 border-amber-200 bg-amber-50">
          <p className="text-sm leading-relaxed text-ink-700">
            Let op: dit contactformulier is niet bedoeld voor individuele
            medische vragen. Neem daarvoor contact op met je eigen
            zorgverlener of met een professional uit onze{" "}
            <a href="/professionals" className="underline">verwijsgids</a>.
          </p>
        </Card>

        <form action={submitContactForm} className="mt-10 space-y-5">
          <input type="text" name="bedrijfswebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Naam" htmlFor="naam" name="naam" required autoComplete="name" />
            <TextField label="E-mailadres" htmlFor="email" name="email" type="email" required autoComplete="email" />
          </div>

          <SelectField label="Onderwerp" htmlFor="onderwerp" name="onderwerp" defaultValue="algemeen">
            <option value="algemeen">Algemene vraag</option>
            <option value="samenwerking">Samenwerking</option>
            <option value="evenement">Evenement aandragen</option>
            <option value="artikel">Artikel of spreker aandragen</option>
            <option value="professional">Vraag over professionalprofiel</option>
          </SelectField>

          <TextareaField label="Bericht" htmlFor="bericht" name="bericht" required />

          <Button type="submit" size="lg">
            Versturen
          </Button>
        </form>

        <div className="mt-12 border-t border-ink-100 pt-8 text-sm text-ink-600">
          <p>Algemeen e-mailadres: <a href="mailto:info@lowcarbnetherlands.nl" className="text-forest-800 underline">info@lowcarbnetherlands.nl</a> (placeholder)</p>
        </div>
      </div>
    </section>
  );
}
