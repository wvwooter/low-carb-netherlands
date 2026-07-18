"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function NieuwWachtwoordPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setChecking(false);
      return;
    }

    // De reset-link zet de sessie via de URL (hash of code). De
    // Supabase-client verwerkt dit automatisch bij het laden van de pagina;
    // we wachten dat even af voordat we concluderen dat er geen sessie is.
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setHasSession(true);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Kies een wachtwoord van minimaal 8 tekens.");
      return;
    }
    if (password !== confirm) {
      setError("De wachtwoorden komen niet overeen.");
      return;
    }

    setStatus("pending");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError("Instellen is mislukt. Vraag eventueel een nieuwe link aan.");
      setStatus("error");
      return;
    }

    setStatus("done");
    setTimeout(() => router.push("/beheer"), 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink-100 bg-white p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="mb-1 text-center font-serif text-xl font-semibold text-forest-900">
          Nieuw wachtwoord instellen
        </h1>

        {checking ? (
          <p className="text-center text-sm text-ink-500">Bezig met controleren…</p>
        ) : !hasSession ? (
          <>
            <p className="mb-6 text-center text-sm text-ink-700">
              Deze link is ongeldig of verlopen.
            </p>
            <p className="text-center text-sm">
              <Link
                href="/beheer/wachtwoord-vergeten"
                className="text-forest-800 hover:underline"
              >
                Vraag een nieuwe link aan
              </Link>
            </p>
          </>
        ) : status === "done" ? (
          <p className="text-center text-sm text-ink-700">
            Wachtwoord ingesteld. Je wordt doorgestuurd…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Nieuw wachtwoord"
              htmlFor="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Herhaal wachtwoord"
              htmlFor="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === "pending"}>
              {status === "pending" ? "Bezig met opslaan…" : "Wachtwoord instellen"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
