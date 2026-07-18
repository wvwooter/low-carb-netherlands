"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitTags(value: FormDataEntryValue | null): string[] {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

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

interface ArticleFormState {
  error: string | null;
}

function articleFieldsFromFormData(formData: FormData) {
  const titel = String(formData.get("titel") || "").trim();
  const samenvatting = String(formData.get("samenvatting") || "").trim();
  const auteur = String(formData.get("auteur") || "").trim();
  const publicatiedatum = String(formData.get("publicatiedatum") || "").trim();
  const categorie = String(formData.get("categorie") || "").trim();
  const hoofdfoto_url = String(formData.get("hoofdfoto_url") || "").trim();
  const leestijdRaw = String(formData.get("leestijd_minuten") || "").trim();
  const inhoud = String(formData.get("inhoud") || "").trim();
  const disclaimer = String(formData.get("disclaimer") || "").trim();
  const seo_titel = String(formData.get("seo_titel") || "").trim();
  const seo_beschrijving = String(formData.get("seo_beschrijving") || "").trim();
  const tags = splitTags(formData.get("tags"));
  const referenties = splitLines(formData.get("referenties"));
  const leestijd_minuten = leestijdRaw ? parseInt(leestijdRaw, 10) : null;

  return {
    titel,
    samenvatting: samenvatting || null,
    auteur: auteur || null,
    publicatiedatum: publicatiedatum || undefined,
    categorie: categorie || null,
    hoofdfoto_url: hoofdfoto_url || null,
    leestijd_minuten: Number.isFinite(leestijd_minuten) ? leestijd_minuten : null,
    inhoud,
    disclaimer: disclaimer || null,
    seo_titel: seo_titel || null,
    seo_beschrijving: seo_beschrijving || null,
    tags,
    referenties,
  };
}

export async function createArticle(
  _prevState: ArticleFormState | null,
  formData: FormData
): Promise<ArticleFormState> {
  const fields = articleFieldsFromFormData(formData);

  if (!fields.titel || !fields.inhoud) {
    return { error: "Titel en inhoud zijn verplicht." };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const baseSlug = slugify(fields.titel);
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    attempt += 1;
    slug = `${baseSlug}-${attempt + 1}`;
  }

  const { error } = await supabase.from("articles").insert({
    slug,
    ...fields,
  });

  if (error) return { error: "Opslaan is mislukt." };

  revalidatePath("/beheer/artikelen");
  revalidatePath("/artikelen");
  redirect("/beheer/artikelen");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleFormState | null,
  formData: FormData
): Promise<ArticleFormState> {
  const fields = articleFieldsFromFormData(formData);

  if (!fields.titel || !fields.inhoud) {
    return { error: "Titel en inhoud zijn verplicht." };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase.from("articles").update(fields).eq("id", id);

  if (error) return { error: "Opslaan is mislukt." };

  revalidatePath("/beheer/artikelen");
  revalidatePath("/artikelen");
  redirect("/beheer/artikelen");
}

export async function deleteArticle(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is niet geconfigureerd." };

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) return { error: "Verwijderen is mislukt." };

  revalidatePath("/beheer/artikelen");
  revalidatePath("/artikelen");
  return { error: null };
}
