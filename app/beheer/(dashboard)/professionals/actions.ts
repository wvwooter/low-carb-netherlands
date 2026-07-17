"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function toggleVisibility(id: string, zichtbaar: boolean) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase
    .from("professionals")
    .update({ zichtbaar })
    .eq("id", id);

  if (error) {
    return { error: "Bijwerken van zichtbaarheid is mislukt." };
  }

  revalidatePath("/beheer/professionals");
  revalidatePath("/professionals");
  return { error: null };
}
