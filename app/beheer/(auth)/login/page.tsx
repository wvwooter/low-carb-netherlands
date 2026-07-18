"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "./actions";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Bezig met inloggen…" : "Inloggen"}
    </Button>
  );
}

export default function BeheerLoginPage() {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink-100 bg-white p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="mb-1 text-center font-serif text-xl font-semibold text-forest-900">
          Beheerpaneel
        </h1>
        <p className="mb-6 text-center text-sm text-ink-500">
          Alleen voor beheerders van Low Carb Netherlands.
        </p>
        <form action={formAction} className="space-y-4">
          <TextField
            label="E-mailadres"
            htmlFor="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Wachtwoord"
            htmlFor="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          {state?.error && (
            <p className="field-error" role="alert">
              {state.error}
            </p>
          )}
          <SubmitButton />
        </form>
        <p className="mt-6 text-center text-sm text-ink-500">
          <Link href="/beheer/wachtwoord-vergeten" className="text-forest-800 hover:underline">
            Wachtwoord vergeten?
          </Link>
        </p>
      </div>
    </div>
  );
}
