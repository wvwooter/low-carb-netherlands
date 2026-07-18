"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getYoutubeId } from "@/lib/youtube";

interface AddVideoState {
  error: string | null;
}

export async function addVideo(
  _prevState: AddVideoState | null,
  formData: FormData
): Promise<AddVideoState> {
  const titel = String(formData.get("titel") || "").trim();
  const beschrijving = String(formData.get("beschrijving") || "").trim();
  const youtubeUrl = String(formData.get("youtube_url") || "").trim();

  if (!titel || !youtubeUrl) {
    return { error: "Titel en YouTube-link zijn verplicht." };
  }

  if (!getYoutubeId(youtubeUrl)) {
    return { error: "Dit lijkt geen geldige YouTube-link te zijn." };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase.from("videos").insert({
    titel,
    beschrijving: beschrijving || null,
    youtube_url: youtubeUrl,
  });

  if (error) return { error: "Toevoegen is mislukt." };

  revalidatePath("/beheer/videos");
  revalidatePath("/videos");
  return { error: null };
}

export async function toggleVideoPublished(id: string, gepubliceerd: boolean) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase
    .from("videos")
    .update({ gepubliceerd })
    .eq("id", id);

  if (error) return { error: "Bijwerken is mislukt." };

  revalidatePath("/beheer/videos");
  revalidatePath("/videos");
  return { error: null };
}

export async function deleteVideo(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase.from("videos").delete().eq("id", id);

  if (error) return { error: "Verwijderen is mislukt." };

  revalidatePath("/beheer/videos");
  revalidatePath("/videos");
  return { error: null };
}
