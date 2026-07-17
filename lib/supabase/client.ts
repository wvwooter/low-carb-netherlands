"use client";

// Browser-side Supabase-client (gebruikt de publieke anon-key).
// Retourneert null als de omgevingsvariabelen nog niet zijn ingesteld,
// zodat de site lokaal blijft draaien vóórdat Supabase is gekoppeld.

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createBrowserClient(url, anonKey);
}
