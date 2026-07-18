import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Logo } from "@/components/layout/Logo";
import { signOut } from "../actions";

const NAV = [
  { href: "/beheer", label: "Overzicht" },
  { href: "/beheer/aanmeldingen", label: "Aanmeldingen" },
  { href: "/beheer/professionals", label: "Professionals" },
  { href: "/beheer/artikelen", label: "Artikelen" },
  { href: "/beheer/evenementen", label: "Evenementen" },
  { href: "/beheer/videos", label: "Video's" },
] as const;

export default async function BeheerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    redirect("/beheer/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/beheer/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("volledige_naam, rol")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    // Ingelogd bij Supabase Auth, maar geen geautoriseerd beheeraccount.
    await supabase.auth.signOut();
    redirect("/beheer/login");
  }

  return (
    <div className="flex min-h-screen bg-forest-50/40">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink-100 bg-white px-5 py-6 lg:flex">
        <Logo className="mb-8" />
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-forest-50 hover:text-forest-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-ink-100 pt-4">
          <p className="mb-2 text-sm text-ink-500">
            Ingelogd als
            <br />
            <span className="font-medium text-ink-700">
              {profile.volledige_naam || user.email}
            </span>{" "}
            <span className="text-xs uppercase tracking-wide text-forest-700">
              ({profile.rol})
            </span>
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm font-medium text-ink-500 underline-offset-2 hover:text-forest-800 hover:underline"
            >
              Uitloggen
            </button>
          </form>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-ink-100 bg-white px-4 py-3 lg:hidden">
          <Logo />
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm font-medium text-ink-500 underline-offset-2 hover:text-forest-800 hover:underline"
            >
              Uitloggen
            </button>
          </form>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-ink-100 bg-white px-4 py-2 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-forest-50 hover:text-forest-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="container-page py-8">{children}</main>
      </div>
    </div>
  );
}
