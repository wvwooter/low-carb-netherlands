import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import {
  CheckboxField,
  SelectField,
  TextField,
  TextareaField,
} from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { PROFESSION_LABELS } from "@/lib/types";
import { submitProfessionalApplication } from "./actions";
import { LocationFields } from "./LocationFields";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aanmelden als professional",
  description:
    "Meld je aan voor de verwijsgids van Low Carb Netherlands. Profielen worden beoordeeld voordat ze zichtbaar worden.",
  ...canonical("/aanmelden"),
};

export default function AanmeldenPage() {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold text-forest-900">
          Aanmelden als professional
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">
          Werk je als arts, diëtist, fysiotherapeut of andere professional
          met ervaring in low-carb of metabole gezondheid? Meld je aan voor
          de verwijsgids.
        </p>

        <Card className="mt-4 border-amber-200 bg-amber-50">
          <p className="text-sm leading-relaxed text-ink-700">
            Elke aanmelding wordt eerst beoordeeld door de redactie. Pas na
            goedkeuring wordt je profiel zichtbaar op het platform. Dit kan
            enkele dagen duren.
          </p>
        </Card>

        <form
          action={submitProfessionalApplication}
          className="mt-10 space-y-10"
        >
          {/* Honeypot — verborgen voor mensen, gevuld door bots */}
          <input
            type="text"
            name="website_bevestiging"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-semibold text-forest-900">
              Persoonlijke gegevens
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Voornaam" htmlFor="voornaam" name="voornaam" required autoComplete="given-name" />
              <TextField label="Achternaam" htmlFor="achternaam" name="achternaam" required autoComplete="family-name" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Zakelijk e-mailadres" htmlFor="email" name="email" type="email" required autoComplete="email" />
              <TextField label="Telefoonnummer" htmlFor="telefoonnummer" name="telefoonnummer" type="tel" autoComplete="tel" />
            </div>
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-semibold text-forest-900">
              Professionele gegevens
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField label="Beroep" htmlFor="beroep" name="beroep" required defaultValue="">
                <option value="" disabled>Kies je beroep</option>
                {Object.entries(PROFESSION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </SelectField>
              <TextField label="Organisatie / praktijk" htmlFor="organisatie" name="organisatie" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label="Beroepsregistratie (bv. BIG-register)" htmlFor="beroepsregistratie" name="beroepsregistratie" hint="Bijvoorbeeld BIG-register, Kwaliteitsregister Paramedici." />
              <TextField label="Registratienummer" htmlFor="registratienummer" name="registratienummer" />
            </div>
            <TextField label="Website" htmlFor="website" name="website" type="text" placeholder="bijv. mijnpraktijk.nl" hint="Met of zonder https:// ervoor, allebei is goed." />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-semibold text-forest-900">
              Locatie
            </legend>
            <TextField label="Adres" htmlFor="adres" name="adres" required />
            <LocationFields />
            <CheckboxField id="online_begeleiding" name="online_begeleiding" label="Ik bied ook online begeleiding aan" />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="mb-1 font-serif text-lg font-semibold text-forest-900">
              Ervaring & motivatie
            </legend>
            <TextareaField label="Relevante opleidingen" htmlFor="opleidingen" name="opleidingen" />
            <TextareaField
              label="Ervaring met low-carb"
              htmlFor="ervaring_low_carb"
              name="ervaring_low_carb"
              required
              hint="Beschrijf kort je ervaring met koolhydraatbeperking in de praktijk."
            />
            <TextareaField label="Behandelgebieden" htmlFor="behandelgebieden" name="behandelgebieden" hint="Bijv. diabetes type 2, obesitas, PCOS, insulineresistentie." />
            <TextareaField label="Korte motivatie" htmlFor="motivatie" name="motivatie" required />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-1 font-serif text-lg font-semibold text-forest-900">
              Akkoord
            </legend>
            <CheckboxField
              id="akkoord_privacy"
              name="akkoord_privacy"
              required
              label={<>Ik ga akkoord met de <a href="/privacyverklaring" className="underline">privacyvoorwaarden</a>.</>}
            />
            <CheckboxField
              id="akkoord_uitgangspunten"
              name="akkoord_uitgangspunten"
              required
              label="Ik onderschrijf de inhoudelijke uitgangspunten van Low Carb Netherlands (wetenschappelijk onderbouwd, geen medische garanties)."
            />
          </fieldset>

          <Button type="submit" size="lg">
            Aanmelding versturen
          </Button>
        </form>
      </div>
    </section>
  );
}
