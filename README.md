# Low Carb Netherlands — MVP

Publieke MVP van lowcarbnetherlands.nl: een Nederlands kennis- en
netwerkplatform rond koolhydraatbeperking, insulineresistentie en metabole
gezondheid.

## Technische stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom design system: donkergroen + oker accent)
- Supabase (database, auth, RLS) — schema klaar, nog niet gekoppeld
- Resend (transactionele e-mail) — client klaar, nog niet gekoppeld
- Vercel (hosting, aanbevolen)

## Projectstructuur

```
app/                     Routes (App Router)
  page.tsx               Homepage
  over-ons/               Over ons
  professionals/          Overzicht + [slug] detail
  aanmelden/               Aanmeldformulier + actions.ts (server action) + bedankt/
  artikelen/               Overzicht + [slug] detail
  evenementen/             Overzicht + [slug] detail
  videos/                  Video's (placeholder)
  contact/                 Contactformulier + actions.ts + bedankt/
  privacyverklaring/, cookiebeleid/, disclaimer/,
  algemene-voorwaarden/, medisch-voorbehoud/   Juridische pagina's (concept)
  sitemap.ts, robots.ts   SEO
components/
  layout/                 Header, Footer, Logo
  ui/                     Button, Card, Badge, Field (form-componenten)
  professionals/, articles/, events/   Card- en filtercomponenten
  legal/                  Gedeelde layout voor juridische pagina's
lib/
  types.ts                Centrale TypeScript-types (spiegelt Supabase-schema)
  constants.ts             Site-constanten, navigatie, provincies, specialisaties
  email.ts                 Resend-wrapper (werkt ook zonder API-key: logt naar console)
  mock-data/                Duidelijk gemarkeerde voorbeelddata (professionals, artikelen, evenementen)
  supabase/                Browser- en server-clients (client.ts, server.ts)
supabase/migrations/0001_init.sql   Volledig databaseschema met Row Level Security
```

## Belangrijkste technische keuzes

- **Mock-data in plaats van live database.** Alle content (professionals,
  artikelen, evenementen) komt nu uit `lib/mock-data/*`, duidelijk als demo
  gemarkeerd. Zodra Supabase is gekoppeld, vervang je deze imports door
  Supabase-queries — de types in `lib/types.ts` sluiten al aan op het schema.
- **Server Actions voor formulieren** (`aanmelden`, `contact`) in plaats van
  API-routes: eenvoudiger, progressive enhancement, werkt zonder JavaScript.
  Bevatten een honeypot-veld en simpele in-memory rate limiting (vervang
  door een robuustere oplossing, bv. Upstash Ratelimit, vóór lancering).
- **Supabase-clients retourneren `null`** als de omgevingsvariabelen
  ontbreken, zodat het project lokaal draait en de formulierflow te testen
  is vóórdat Supabase is gekoppeld (inzendingen worden dan alleen gelogd).
- **RLS vanaf het begin**: elke tabel in `0001_init.sql` heeft Row Level
  Security. Publieke leestoegang is beperkt tot goedgekeurde/gepubliceerde
  content; aanmeldingen en contactinzendingen zijn alleen server-side
  (service-role key) of door beheerders (rol `beheerder` in `profiles`)
  toegankelijk.
- **Geen beheerpaneel in deze fase** — de database is er wel klaar voor
  (`goedkeuringsstatus`, `zichtbaar`, `gepubliceerd`). Bouw dit als
  volgende stap, achter Supabase Auth, nooit publiek toegankelijk.

## Lokaal draaien

```bash
npm install
cp .env.example .env.local   # vul in zodra je Supabase/Resend hebt opgezet
npm run dev
```

De site werkt ook zonder ingevulde `.env.local`: Supabase-writes worden dan
naar de console gelogd in plaats van opgeslagen, en e-mails worden geskipt.

## Controles die zijn uitgevoerd

- `npx tsc --noEmit` — geen TypeScript-fouten
- `npx next lint` — geen ESLint-fouten
- `npm run build` — productie-build slaagt, alle 28 routes gegenereerd

## Wat nog moet gebeuren vóór lancering

1. **Supabase-project aanmaken**, migratie `supabase/migrations/0001_init.sql`
   uitvoeren, omgevingsvariabelen invullen in Vercel.
2. **Resend-account koppelen** voor bevestigings- en notificatiemails.
3. **Mock-data vervangen** door echte, inhoudelijk gecontroleerde artikelen
   en (na goedkeuring) echte professionalsprofielen.
4. **Juridische pagina's laten controleren** door een jurist — nu conceptteksten.
5. **Beheerpaneel bouwen** voor het goedkeuren van professionals en het
   beheren van artikelen/evenementen (schema is voorbereid).
6. **Logo/fotografie**: huidig logo is een eenvoudig tekstlogo + symbool;
   overweeg professionele huisstijl vóór lancering.
7. **Analytics koppelen** (bv. Plausible) — `NEXT_PUBLIC_ANALYTICS_DOMAIN`
   staat al klaar in `.env.example`.
8. **Deployment**: repo naar GitHub pushen, project importeren in Vercel
   (je hebt al een Vercel-account), omgevingsvariabelen instellen.

## Deployment naar Vercel

1. Maak een nieuwe (lege) GitHub-repo aan en push deze projectmap ernaartoe:
   ```bash
   git remote add origin <jouw-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. Ga naar vercel.com → "Add New Project" → importeer de GitHub-repo.
3. Vercel herkent Next.js automatisch (build command `next build`, geen
   verdere configuratie nodig).
4. Voeg de omgevingsvariabelen uit `.env.example` toe in
   Project Settings → Environment Variables.
5. Deploy.
