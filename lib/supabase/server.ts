import "server-only";

// Server-side Supabase-client voor Server Components, Route Handlers en
// Server Actions. Gebruikt cookies voor sessiebeheer (Supabase Auth).
// Retourneert null als de omgevingsvariabelen nog niet zijn ingesteld.

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server Components mogen cookies niet schrijven; wordt afgehandeld
          // door middleware wanneer sessie-refresh nodig is.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // zie hierboven
        }
      },
    },
  });
}

// Service-role client: alléén gebruiken in server-only code (bv. het
// verwerken van professional_applications). Nooit importeren in
// client components.
export function createSupabaseServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
