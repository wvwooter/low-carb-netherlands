-- Low Carb Netherlands — initiële database-schema
-- Voer uit in de Supabase SQL-editor of via `supabase db push`.
-- Alle tabellen hebben Row Level Security (RLS) ingeschakeld.

-- ============================================================
-- Extensies
-- ============================================================
create extension if not exists "pgcrypto";

-- ============================================================
-- profiles
-- Gekoppeld aan Supabase Auth (auth.users). Gebruikt voor
-- beheerders/redacteuren die kunnen inloggen op het beheerpaneel.
-- ============================================================
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  volledige_naam text,
  rol text not null default 'redacteur' check (rol in ('beheerder', 'redacteur')),
  aangemaakt_op timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Gebruikers kunnen eigen profiel lezen"
  on profiles for select
  using (auth.uid() = id);

-- ============================================================
-- professionals
-- Goedgekeurde, publiek zichtbare professionalsprofielen.
-- ============================================================
create table if not exists professionals (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  naam text not null,
  profielfoto_url text,
  beroep text not null check (beroep in (
    'arts', 'medisch_specialist', 'huisarts', 'dietist', 'fysiotherapeut',
    'verpleegkundig_specialist', 'praktijkondersteuner', 'leefstijlcoach',
    'onderzoeker', 'overig'
  )),
  big_registratie text,
  organisatie text,
  locatie text not null,
  provincie text not null,
  postcode text,
  website text,
  email text not null,
  telefoonnummer text,
  ervaring_low_carb boolean not null default false,
  ervaring_diabetes_type_2 boolean not null default false,
  ervaring_obesitas boolean not null default false,
  ervaring_metabole_gezondheid boolean not null default false,
  online_consult boolean not null default false,
  bio text,
  goedkeuringsstatus text not null default 'pending' check (goedkeuringsstatus in ('pending', 'approved', 'rejected')),
  zichtbaar boolean not null default false,
  aangemeld_op timestamptz not null default now()
);

alter table professionals enable row level security;

create policy "Publiek kan goedgekeurde, zichtbare professionals lezen"
  on professionals for select
  using (goedkeuringsstatus = 'approved' and zichtbaar = true);

create policy "Beheerders kunnen alle professionals beheren"
  on professionals for all
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- ============================================================
-- professional_specialties
-- Many-to-many: professional <-> specialisatie.
-- ============================================================
create table if not exists professional_specialties (
  professional_id uuid not null references professionals (id) on delete cascade,
  specialisatie text not null,
  primary key (professional_id, specialisatie)
);

alter table professional_specialties enable row level security;

create policy "Publiek kan specialisaties van zichtbare professionals lezen"
  on professional_specialties for select
  using (
    exists (
      select 1 from professionals
      where professionals.id = professional_specialties.professional_id
        and professionals.goedkeuringsstatus = 'approved'
        and professionals.zichtbaar = true
    )
  );

create policy "Beheerders kunnen specialisaties beheren"
  on professional_specialties for all
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- ============================================================
-- professional_applications
-- Aanmeldingen van professionals, status 'pending' totdat beoordeeld.
-- Alleen server-side (service role) toegankelijk — geen publieke
-- lees- of schrijfrechten.
-- ============================================================
create table if not exists professional_applications (
  id uuid primary key default gen_random_uuid(),
  voornaam text not null,
  achternaam text not null,
  beroep text not null,
  beroepsregistratie text,
  registratienummer text,
  organisatie text,
  adres text,
  postcode text,
  plaats text,
  provincie text,
  website text,
  email text not null,
  telefoonnummer text,
  online_begeleiding boolean not null default false,
  opleidingen text,
  ervaring_low_carb text,
  behandelgebieden text,
  motivatie text,
  akkoord_privacy boolean not null default false,
  akkoord_uitgangspunten boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  aangemaakt_op timestamptz not null default now()
);

alter table professional_applications enable row level security;

create policy "Beheerders kunnen aanmeldingen lezen en beheren"
  on professional_applications for all
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- Geen insert-policy voor de 'anon'/'authenticated' rol: inserts lopen via
-- een server action met de service-role key, buiten RLS om.

-- ============================================================
-- categories
-- ============================================================
create table if not exists categories (
  slug text primary key,
  naam text not null
);

alter table categories enable row level security;

create policy "Publiek kan categorieën lezen"
  on categories for select
  using (true);

-- ============================================================
-- articles
-- ============================================================
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titel text not null,
  samenvatting text,
  auteur text,
  publicatiedatum date not null default current_date,
  categorie text references categories (slug),
  tags text[] not null default '{}',
  hoofdfoto_url text,
  leestijd_minuten integer,
  inhoud text not null,
  referenties text[] not null default '{}',
  disclaimer text,
  seo_titel text,
  seo_beschrijving text,
  social_share_image_url text,
  gepubliceerd boolean not null default false,
  aangemaakt_op timestamptz not null default now()
);

alter table articles enable row level security;

create policy "Publiek kan gepubliceerde artikelen lezen"
  on articles for select
  using (gepubliceerd = true);

create policy "Beheerders kunnen artikelen beheren"
  on articles for all
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- ============================================================
-- events
-- ============================================================
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titel text not null,
  datum date not null,
  begintijd time,
  eindtijd time,
  locatie text,
  modaliteit text check (modaliteit in ('online', 'fysiek', 'hybride')),
  organisator text,
  beschrijving text,
  doelgroep text,
  inschrijflink text,
  prijs text,
  afbeelding_url text,
  gepubliceerd boolean not null default false,
  aangemaakt_op timestamptz not null default now()
);

alter table events enable row level security;

create policy "Publiek kan gepubliceerde evenementen lezen"
  on events for select
  using (gepubliceerd = true);

create policy "Beheerders kunnen evenementen beheren"
  on events for all
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- ============================================================
-- contact_submissions
-- Alleen server-side (service role) toegankelijk.
-- ============================================================
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null,
  onderwerp text,
  bericht text not null,
  aangemaakt_op timestamptz not null default now()
);

alter table contact_submissions enable row level security;

create policy "Beheerders kunnen contactinzendingen lezen"
  on contact_submissions for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- ============================================================
-- newsletter_subscribers
-- ============================================================
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  aangemeld_op timestamptz not null default now(),
  uitgeschreven boolean not null default false
);

alter table newsletter_subscribers enable row level security;

create policy "Beheerders kunnen abonnees lezen"
  on newsletter_subscribers for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

-- Inserts voor nieuwsbrief lopen via server action met service-role key.

-- ============================================================
-- Indexen
-- ============================================================
create index if not exists idx_professionals_provincie on professionals (provincie);
create index if not exists idx_professionals_beroep on professionals (beroep);
create index if not exists idx_articles_categorie on articles (categorie);
create index if not exists idx_events_datum on events (datum);
