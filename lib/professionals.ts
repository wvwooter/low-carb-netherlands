import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Professional } from "@/lib/types";

type ProfessionalRow = Omit<Professional, "specialisaties"> & {
  professional_specialties: { specialisatie: string }[] | null;
};

function mapRow(row: ProfessionalRow): Professional {
  const { professional_specialties, ...rest } = row;
  return {
    ...rest,
    specialisaties: (professional_specialties ?? []).map((s) => s.specialisatie),
  };
}

/** Alle publiek zichtbare, goedgekeurde professionals (voor overzicht + sitemap). */
export async function getVisibleProfessionals(): Promise<Professional[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("professionals")
    .select("*, professional_specialties(specialisatie)")
    .eq("zichtbaar", true)
    .eq("goedkeuringsstatus", "approved")
    .order("naam", { ascending: true });

  if (error || !data) {
    console.error("Fout bij ophalen professionals:", error);
    return [];
  }

  return (data as ProfessionalRow[]).map(mapRow);
}

/** Eén publiek zichtbare, goedgekeurde professional op slug (voor detailpagina). */
export async function getVisibleProfessionalBySlug(
  slug: string
): Promise<Professional | null> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("professionals")
    .select("*, professional_specialties(specialisatie)")
    .eq("slug", slug)
    .eq("zichtbaar", true)
    .eq("goedkeuringsstatus", "approved")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapRow(data as ProfessionalRow);
}
