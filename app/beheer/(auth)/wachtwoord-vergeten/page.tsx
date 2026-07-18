"use client";

import { useState } from "react";
import Link from "next/link";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("pending");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/beheer/nieuw-wachtwoord`,
    });

    // Geen onderscheid maken tussen "bestaat niet" en "gelukt": voorkomt dat
    // je kunt aftasten welke e-mailadressen een account hebben.
    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink-100 bg-white p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="mb-1 text-center font-serif text-xl font-semibold text-forest-900">
          Wachtwoord vergeten
        </h1>
        <p className="mb-6 text-center text-sm text-ink-500">
          Vul je e-mailadres in, dan sturen we je een link om een nieuw
          wachtwoord in te stellen.
        </p>

        {status === "sent" ? (
          <p className="text-center text-sm text-ink-700">
            Als dit e-mailadres bij een beheerdersaccount hoort, is er een
            link verstuurd. Check je inbox (en spam).
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="E-mailadres"
              htmlFor="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {status === "error" && (
              <p className="field-error" role="alert">
                Er ging iets mis. Probeer het later opnieuw.
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === "pending"}>
              {status === "pending" ? "Bezig met versturen…" : "Verstuur link"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-ink-500">
          <Link href="/beheer/login" className="text-forest-800 hover:underline">
            ← Terug naar inloggen
          </Link>
        </p>
      </div>
    </div>
  );
}
