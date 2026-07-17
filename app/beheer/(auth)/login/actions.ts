"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signIn(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Vul e-mailadres en wachtwoord in." };
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      error:
        "Supabase is nog niet gekoppeld. Stel de omgevingsvariabelen in voordat je kunt inloggen.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Onjuist e-mailadres of wachtwoord." };
  }

  redirect("/beheer");
}
