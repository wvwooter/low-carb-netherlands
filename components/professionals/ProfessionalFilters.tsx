"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { COUNTRIES, PROVINCES_BY_COUNTRY, SPECIALTIES, type CountryCode } from "@/lib/constants";
import { PROFESSION_LABELS } from "@/lib/types";

export function ProfessionalFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/professionals?${params.toString()}`);
  }

  return (
    <form
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
      aria-label="Professionals filteren"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label htmlFor="filter-beroep" className="label">
          Beroep
        </label>
        <select
          id="filter-beroep"
          className="field"
          defaultValue={searchParams.get("beroep") ?? ""}
          onChange={(e) => updateParam("beroep", e.target.value)}
        >
          <option value="">Alle beroepen</option>
          {Object.entries(PROFESSION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-land" className="label">
          Land
        </label>
        <select
          id="filter-land"
          className="field"
          defaultValue={searchParams.get("land") ?? ""}
          onChange={(e) => {
            // Land wisselen maakt een eerder gekozen provincie ongeldig
            // (NL en BE hebben allebei een "Limburg") — dus resetten.
            const params = new URLSearchParams(searchParams.toString());
            if (e.target.value) params.set("land", e.target.value);
            else params.delete("land");
            params.delete("provincie");
            router.push(`/professionals?${params.toString()}`);
          }}
        >
          <option value="">Nederland en België</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-provincie" className="label">
          Provincie
        </label>
        <select
          id="filter-provincie"
          className="field"
          defaultValue={searchParams.get("provincie") ?? ""}
          onChange={(e) => updateParam("provincie", e.target.value)}
        >
          <option value="">Alle provincies</option>
          {(searchParams.get("land")
            ? PROVINCES_BY_COUNTRY[searchParams.get("land") as CountryCode]
            : Array.from(
                new Set([...PROVINCES_BY_COUNTRY.NL, ...PROVINCES_BY_COUNTRY.BE])
              )
          ).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-plaats" className="label">
          Plaats
        </label>
        <input
          id="filter-plaats"
          type="text"
          className="field"
          placeholder="Bijv. Utrecht"
          defaultValue={searchParams.get("plaats") ?? ""}
          onBlur={(e) => updateParam("plaats", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filter-specialisatie" className="label">
          Specialisatie
        </label>
        <select
          id="filter-specialisatie"
          className="field"
          defaultValue={searchParams.get("specialisatie") ?? ""}
          onChange={(e) => updateParam("specialisatie", e.target.value)}
        >
          <option value="">Alle specialisaties</option>
          {SPECIALTIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end pb-2.5">
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-ink-300 text-forest-700 focus:ring-forest-300"
            defaultChecked={searchParams.get("online") === "1"}
            onChange={(e) => updateParam("online", e.target.checked ? "1" : "")}
          />
          Online begeleiding mogelijk
        </label>
      </div>
    </form>
  );
}
