"use client";

import { useState } from "react";
import { SelectField, TextField } from "@/components/ui/Field";
import {
  COUNTRIES,
  PROVINCES_BY_COUNTRY,
  type CountryCode,
} from "@/lib/constants";

/**
 * Land + provincie horen bij elkaar: de provincie-opties hangen af van het
 * gekozen land (NL of BE). Dit moet client-side, anders kan de provincie-
 * lijst niet meewisselen zonder paginareload.
 */
export function LocationFields() {
  const [land, setLand] = useState<CountryCode>("NL");
  const provincies = PROVINCES_BY_COUNTRY[land];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Postcode" htmlFor="postcode" name="postcode" required />
        <TextField label="Plaats" htmlFor="plaats" name="plaats" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Land"
          htmlFor="land"
          name="land"
          required
          value={land}
          onChange={(e) => setLand(e.target.value as CountryCode)}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </SelectField>
        {/* key={land} zorgt dat de provincie-keuze reset zodra het land wisselt,
            zodat je nooit een NL-provincie kunt opsturen terwijl land=BE staat. */}
        <SelectField
          label="Provincie"
          htmlFor="provincie"
          name="provincie"
          required
          defaultValue=""
          key={land}
        >
          <option value="" disabled>Kies provincie</option>
          {provincies.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </SelectField>
      </div>
    </>
  );
}
