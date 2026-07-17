"use server";

import { redirect } from "next/navigation";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { sendAdminApplicationNotification } from "@/lib/email";

const submissions = new Map<string, number>();
const WINDOW_MS = 60_000;

function isRateLimited(key: string) {
  const now = Date.now();
  const last = submissions.get(key) ?? 0;
  if (now - last < WINDOW_MS) return true;
  submissions.set(key, now);
  return false;
}

export async function submitContactForm(formData: FormData) {
  const honeypot = formData.get("bedrijfswebsite");
  if (honeypot) {
    redirect("/contact/bedankt");
  }

  const naam = String(formData.get("naam") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const onderwerp = String(formData.get("onderwerp") ?? "").trim();
  const bericht = String(formData.get("bericht") ?? "").trim();

  if (!naam || !email || !bericht) {
    throw new Error("Vul alle verplichte velden in.");
  }

  if (isRateLimited(email)) {
    throw new Error("Te veel pogingen. Probeer het later opnieuw.");
  }

  const supabase = createSupabaseServiceRoleClient();
  if (supabase) {
    const { error } = await supabase.from("contact_submissions").insert({
      naam,
      email,
      onderwerp,
      bericht,
    });
    if (error) {
      console.error("Supabase insert-fout (contact):", error);
      throw new Error("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
    }
  } else {
    console.info("[contact:demo — Supabase niet geconfigureerd]", { naam, email, onderwerp, bericht });
  }

  await sendAdminApplicationNotification({
    naam,
    beroep: `Contactformulier: ${onderwerp || "algemeen"}`,
    email,
  });

  redirect("/contact/bedankt");
}
