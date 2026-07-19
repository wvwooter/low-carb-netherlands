import Link from "next/link";
import { Logo } from "./Logo";
import { LEGAL_NAV, MAIN_NAV, SITE_DESCRIPTION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-forest-50/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-forest-900">
            Navigatie
          </h3>
          <ul className="space-y-2">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-500 hover:text-forest-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/bronnen"
                className="text-sm text-ink-500 hover:text-forest-800"
              >
                Wetenschappelijke bronnen
              </Link>
            </li>
            <li>
              <Link
                href="/doneer"
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                Doneer
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-forest-900">
            Juridisch
          </h3>
          <ul className="space-y-2">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-500 hover:text-forest-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-forest-900">
            Blijf op de hoogte
          </h3>
          <p className="mb-3 text-sm text-ink-500">
            Ontvang updates over artikelen, evenementen en nieuwe
            professionals.
          </p>
          <form className="flex gap-2" aria-label="Nieuwsbrief aanmelden">
            <label htmlFor="footer-newsletter" className="sr-only">
              E-mailadres
            </label>
            <input
              id="footer-newsletter"
              type="email"
              required
              placeholder="jouw@email.nl"
              className="field !py-2 text-sm"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-forest-800 px-4 py-2 text-sm font-medium text-white hover:bg-forest-700"
            >
              Aanmelden
            </button>
          </form>
          <div className="mt-5 flex gap-4">
            <a
              href="https://www.linkedin.com"
              className="text-sm text-ink-500 hover:text-forest-800"
              aria-label="Low Carb Netherlands op LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              className="text-sm text-ink-500 hover:text-forest-800"
              aria-label="Low Carb Netherlands op Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-100 py-6">
        <div className="container-page flex flex-col gap-2 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Low Carb Netherlands. Alle rechten
            voorbehouden.
          </p>
          <p>
            Informatie op dit platform vervangt geen individueel medisch
            advies.
          </p>
        </div>
      </div>
    </footer>
  );
}
