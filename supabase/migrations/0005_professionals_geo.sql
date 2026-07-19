-- Voegt geocoördinaten toe aan professionals, voor de kaartweergave op
-- /professionals en de detailpagina's. Wordt gevuld bij goedkeuring van een
-- aanmelding (zie approveApplication) via Nominatim (OpenStreetMap), of
-- handmatig voor bestaande rijen.

alter table professionals add column if not exists latitude double precision;
alter table professionals add column if not exists longitude double precision;
