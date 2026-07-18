-- Low Carb Netherlands — videos-tabel
-- Voer uit in de Supabase SQL-editor.

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  titel text not null,
  beschrijving text,
  youtube_url text not null,
  gepubliceerd boolean not null default false,
  aangemaakt_op timestamptz not null default now()
);

alter table videos enable row level security;

create policy "Publiek kan gepubliceerde videos lezen"
  on videos for select
  using (gepubliceerd = true);

create policy "Beheerders kunnen videos beheren"
  on videos for all
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.rol = 'beheerder')
  );

create index if not exists idx_videos_gepubliceerd on videos (gepubliceerd);
