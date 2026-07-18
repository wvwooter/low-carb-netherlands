"use server";

import { redirect } from "next/navigation";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import {
  sendAdminApplicationNotification,
  sendApplicationConfirmationEmail,
} from "@/lib/email";

// Zeer eenvoudige rate limiting op basis van in-memory map (per proces).
// Voor productie: vervang door bv. Upstash Ratelimit of Supabase-tabel.
const submissions = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isRateLimited(key: string) {
  const now = Date.now();
  const last = submissions.get(key) ?? 0;
  if (now - last < WINDOW_MS / MAX_PER_WINDOW) return true;
  submissions.set(key, now);
  return false;
}

export async function submitProfessionalApplication(formData: FormData) {
  // Honeypot-veld: bots vullen dit vaak in, mensen zien het niet.
  const honeypot = formData.get("website_bevestiging");
  if (honeypot) {
    redirect("/aanmelden/bedankt");
  }

  const email = String(formData.get("email") ?? "").trim();
  const voornaam = String(formData.get("voornaam") ?? "").trim();
  const achternaam = String(formData.get("achternaam") ?? "").trim();
  const beroep = String(formData.get("beroep") ?? "").trim();

  // Website is een gewoon tekstveld (niet type="url"): browsers blokkeerden
  // anders stil de hele formulier-submit als iemand een adres zonder
  // "https://" invulde. Hier vullen we het schema aan indien nodig.
  const websiteRuw = String(formData.get("website") ?? "").trim();
  const website = websiteRuw && !/^https?:\/\//i.test(websiteRuw)
    ? `https://${websiteRuw}`
    : websiteRuw;

  if (!email || !voornaam || !achternaam || !beroep) {
    throw new Error("Verplichte velden ontbreken.");
  }

  if (isRateLimited(email)) {
    throw new Error("Te veel pogingen. Probeer het later opnieuw.");
  }

  const application = {
    voornaam,
    achternaam,
    beroep,
    beroepsregistratie: String(formData.get("beroepsregistratie") ?? ""),
    registratienummer: String(formData.get("registratienummer") ?? ""),
    organisatie: String(formData.get("organisatie") ?? ""),
    adres: String(formData.get("adres") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    plaats: String(formData.get("plaats") ?? ""),
    provincie: String(formData.get("provincie") ?? ""),
    website,
    email,
    telefoonnummer: String(formData.get("telefoonnummer") ?? ""),
    online_begeleiding: formData.get("online_begeleiding") === "on",
    opleidingen: String(formData.get("opleidingen") ?? ""),
    ervaring_low_carb: String(formData.get("ervaring_low_carb") ?? ""),
    behandelgebieden: String(formData.get("behandelgebieden") ?? ""),
    motivatie: String(formData.get("motivatie") ?? ""),
    akkoord_privacy: formData.get("akkoord_privacy") === "on",
    akkoord_uitgangspunten: formData.get("akkoord_uitgangspunten") === "on",
    status: "pending" as const,
  };

  if (!application.akkoord_privacy || !application.akkoord_uitgangspunten) {
    throw new Error("Je moet akkoord gaan met de voorwaarden.");
  }

  const supabase = createSupabaseServiceRoleClient();

  if (supabase) {
    const { error } = await supabase
      .from("professional_applications")
      .insert(application);

    if (error) {
      console.error("Supabase insert-fout:", error);
      throw new Error(
        "Er ging iets mis bij het opslaan van je aanmelding. Probeer het later opnieuw."
      );
    }
  } else {
    // Supabase nog niet gekoppeld: log lokaal zodat de flow te testen is.
    console.info("[aanmelding:demo — Supabase niet geconfigureerd]", application);
  }

  await Promise.all([
    sendApplicationConfirmationEmail({ to: email, voornaam }),
    sendAdminApplicationNotification({
      naam: `${voornaam} ${achternaam}`,
      beroep,
      email,
    }),
  ]);

  redirect("/aanmelden/bedankt");
}
