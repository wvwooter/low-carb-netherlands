-- Voegt nieuwe beroepscategorieën toe aan professionals.beroep:
-- metabool_therapeut, orthomoleculair_therapeut, voedingsdeskundige, psycholoog.
-- Voer uit in de Supabase SQL-editor.

alter table professionals drop constraint if exists professionals_beroep_check;

alter table professionals add constraint professionals_beroep_check check (beroep in (
  'arts', 'medisch_specialist', 'huisarts', 'dietist', 'fysiotherapeut',
  'verpleegkundig_specialist', 'praktijkondersteuner', 'leefstijlcoach',
  'metabool_therapeut', 'orthomoleculair_therapeut', 'voedingsdeskundige',
  'psycholoog', 'onderzoeker', 'overig'
));
