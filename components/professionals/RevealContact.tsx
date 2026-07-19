"use client";

import { useState } from "react";

interface Props {
  type: "email" | "tel";
  value: string;
  label: string;
}

/**
 * Toont een e-mailadres of telefoonnummer pas na een klik, in plaats van het
 * meteen als platte tekst / mailto-link in de HTML te zetten. Dat voorkomt
 * niet 100% van het scrapen (het staat nog wel in de payload die naar de
 * browser gaat), maar houdt de eenvoudige, veelvoorkomende spam-bots tegen
 * die statische pagina's afspeuren op zichtbare e-mailadressen en
 * mailto-links.
 */
export function RevealContact({ type, value, label }: Props) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a
        href={`${type === "email" ? "mailto" : "tel"}:${value}`}
        className="text-forest-800 hover:underline"
      >
        {value}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="text-sm font-medium text-forest-800 underline decoration-dotted underline-offset-2 hover:text-forest-700"
    >
      {label}
    </button>
  );
}
