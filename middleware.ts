import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Ververst de Supabase-sessie (indien geconfigureerd) bij elk verzoek en
// beveiligt alle routes onder /beheer. Draait vóór elke request die matcht.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isBeheerRoute = request.nextUrl.pathname.startsWith("/beheer");
  const isLoginRoute = request.nextUrl.pathname === "/beheer/login";
  // Wachtwoord-vergeten en nieuw-wachtwoord moeten ook zonder (volledige)
  // sessie bereikbaar zijn: de reset-link zet de sessie via een URL-hash
  // die alleen client-side leesbaar is, dus de server ziet 'm nog niet.
  const isPublicAuthRoute =
    isLoginRoute ||
    request.nextUrl.pathname === "/beheer/wachtwoord-vergeten" ||
    request.nextUrl.pathname === "/beheer/nieuw-wachtwoord";

  // Supabase nog niet gekoppeld: laat publieke routes gewoon werken, maar
  // blokkeer /beheer volledig (geen auth mogelijk zonder Supabase).
  if (!url || !anonKey) {
    if (isBeheerRoute && !isPublicAuthRoute) {
      return NextResponse.redirect(new URL("/beheer/login", request.url));
    }
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({ request: { headers: request.headers } });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isBeheerRoute && !isPublicAuthRoute && !user) {
    return NextResponse.redirect(new URL("/beheer/login", request.url));
  }

  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/beheer", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/beheer/:path*"],
};
