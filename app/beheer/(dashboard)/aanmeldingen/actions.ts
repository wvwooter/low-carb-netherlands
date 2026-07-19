"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { geocodeAddress } from "@/lib/geocode";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function approveApplication(applicationId: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { data: application, error: fetchError } = await supabase
    .from("professional_applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (fetchError || !application) {
    return { error: "Aanmelding niet gevonden." };
  }

  const baseSlug = slugify(`${application.voornaam}-${application.achternaam}`);
  let slug = baseSlug;
  let attempt = 0;
  // Zorg voor een unieke slug.
  while (true) {
    const { data: existing } = await supabase
      .from("professionals")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    attempt += 1;
    slug = `${baseSlug}-${attempt + 1}`;
  }

  const geocodeQuery = [
    application.adres,
    application.postcode,
    application.plaats,
    application.provincie,
    "Nederland",
  ]
    .filter(Boolean)
    .join(", ");
  const coords = await geocodeAddress(geocodeQuery);

  const { error: insertError } = await supabase.from("professionals").insert({
    slug,
    naam: `${application.voornaam} ${application.achternaam}`,
    beroep: application.beroep,
    big_registratie: application.registratienummer || null,
    organisatie: application.organisatie || null,
    locatie: application.plaats || application.adres || "Onbekend",
    provincie: application.provincie || "Onbekend",
    postcode: application.postcode || null,
    website: application.website || null,
    email: application.email,
    telefoonnummer: application.telefoonnummer || null,
    online_consult: application.online_begeleiding ?? false,
    ervaring_low_carb: Boolean(application.ervaring_low_carb),
    bio: application.motivatie || application.behandelgebieden || null,
    goedkeuringsstatus: "approved",
    zichtbaar: true,
    latitude: coords?.latitude ?? null,
    longitude: coords?.longitude ?? null,
  });

  if (insertError) {
    console.error("Fout bij aanmaken professional:", insertError);
    return { error: "Aanmaken van professional is mislukt." };
  }

  const { error: updateError } = await supabase
    .from("professional_applications")
    .update({ status: "approved" })
    .eq("id", applicationId);

  if (updateError) {
    console.error("Fout bij bijwerken aanmelding:", updateError);
  }

  revalidatePath("/beheer/aanmeldingen");
  revalidatePath("/beheer/professionals");
  revalidatePath("/professionals");
  return { error: null };
}

export async function rejectApplication(applicationId: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase
    .from("professional_applications")
    .update({ status: "rejected" })
    .eq("id", applicationId);

  if (error) {
    return { error: "Afwijzen is mislukt." };
  }

  revalidatePath("/beheer/aanmeldingen");
  return { error: null };
}
