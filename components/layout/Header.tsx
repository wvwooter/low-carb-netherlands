"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { MAIN_NAV } from "@/lib/constants";

// In de balk zelf tonen we bewust niet alle MAIN_NAV-items: "Home" is
// overbodig naast het logo (dat al naar / linkt), en "Contact" staat ook
// in de footer. Zo blijft de balk rustig. Het mobiele menu toont wel de
// volledige lijst.
const DESKTOP_NAV = MAIN_NAV.filter(
  (item) => !["/", "/aanmelden", "/contact"].includes(item.href)
);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Logo singleLine />

        <nav
          className="hidden items-center gap-5 xl:flex"
          aria-label="Hoofdnavigatie"
        >
          {DESKTOP_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-forest-800 ${
                  active ? "text-forest-800" : "text-ink-700"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/doneer"
            className="whitespace-nowrap text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Doneer
          </Link>
          <Link
            href="/aanmelden"
            className="whitespace-nowrap text-sm font-medium text-ink-700 hover:text-forest-800"
          >
            Word professional
          </Link>
          <Link
            href="/professionals"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-forest-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-300"
          >
            Vind een professional
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg text-forest-800 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-ink-100 bg-white xl:hidden"
          aria-label="Mobiele navigatie"
        >
          <div className="container-page flex flex-col gap-1 py-4">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-ink-700 hover:bg-forest-50 hover:text-forest-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/doneer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-amber-600 hover:bg-amber-50"
            >
              Doneer
            </Link>
            <Link
              href="/professionals"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-forest-800 px-5 py-3 text-base font-medium text-white"
            >
              Vind een professional
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
