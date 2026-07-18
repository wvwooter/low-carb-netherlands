"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Wat is koolhydraatbeperking (low-carb) precies?",
    answer:
      "Bij low-carb eet je bewust minder koolhydraten (suiker, brood, pasta, rijst) en relatief meer groente, eiwitten en gezonde vetten. Het doel is vaak een stabielere bloedsuiker en minder behoefte aan insuline.",
  },
  {
    question: "Voor wie kan low-carb interessant zijn?",
    answer:
      "Denk aan mensen met insulineresistentie, diabetes type 2 of overgewicht, maar ook aan wie preventief met metabole gezondheid bezig wil zijn. Iedere situatie is anders: overleg veranderingen in je voeding of medicatie altijd met een arts of dietist.",
  },
  {
    question: "Is low-carb hetzelfde als keto?",
    answer:
      "Nee. Keto is een strikte vorm van low-carb die het lichaam in ketose brengt. Low-carb is breder: er zijn veel gradaties, van gematigd minder koolhydraten tot zeer streng.",
  },
  {
    question: "Hoe vind ik een professional die verstand heeft van low-carb?",
    answer:
      "Via onze verwijsgids vind je artsen, dietisten en andere professionals die ervaring hebben met koolhydraatbeperking, gefilterd op regio en specialisatie.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-forest-50/60 sm:px-6"
            >
              <span className="font-serif text-base font-semibold text-forest-900 sm:text-lg">
                {item.question}
              </span>
              <span
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-700 sm:px-6">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
