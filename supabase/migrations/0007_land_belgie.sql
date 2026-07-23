-- Voegt een land-kolom (NL/BE) toe aan professionals en professional_applications,
-- zodat Belgische professionals zich ook kunnen aanmelden en zichtbaar zijn.
-- Bestaande rijen krijgen default 'NL' (alle huidige professionals zijn Nederlands).
-- Voer uit in de Supabase SQL-editor.

alter table professionals
  add column if not exists land text not null default 'NL' check (land in ('NL', 'BE'));

alter table professional_applications
  add column if not exists land text not null default 'NL' check (land in ('NL', 'BE'));

create index if not exists idx_professionals_land on professionals (land);
