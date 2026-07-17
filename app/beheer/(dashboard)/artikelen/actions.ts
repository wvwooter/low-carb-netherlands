"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function togglePublished(id: string, gepubliceerd: boolean) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase
    .from("articles")
    .update({ gepubliceerd })
    .eq("id", id);

  if (error) return { error: "Bijwerken is mislukt." };

  revalidatePath("/beheer/artikelen");
  revalidatePath("/artikelen");
  return { error: null };
}
