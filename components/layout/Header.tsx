"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { MAIN_NAV } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Logo />

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Hoofdnavigatie"
        >
          {MAIN_NAV.filter((item) => item.href !== "/aanmelden").map(
            (item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-forest-800 ${
                    active ? "text-forest-800" : "text-ink-700"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/aanmelden"
            className="text-sm font-medium text-ink-700 hover:text-forest-800"
          >
            Aanmelden als professional
          </Link>
          <Link
            href="/professionals"
            className="inline-flex items-center justify-center rounded-xl bg-forest-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-300"
          >
            Vind een professional
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-forest-800 lg:hidden"
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
          className="border-t border-ink-100 bg-white lg:hidden"
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
