-- Low Carb Netherlands — categorieën seeden voor artikelen
-- Voer uit in de Supabase SQL-editor. Idempotent (kan veilig opnieuw draaien).

insert into categories (slug, naam) values
  ('low-carb', 'Low-carb'),
  ('insulineresistentie', 'Insulineresistentie'),
  ('diabetes-type-2', 'Diabetes type 2'),
  ('obesitas', 'Obesitas'),
  ('metabole-gezondheid', 'Metabole gezondheid'),
  ('voeding', 'Voeding'),
  ('beweging', 'Beweging'),
  ('gewrichten', 'Gewrichten'),
  ('wetenschap', 'Wetenschap'),
  ('praktijkverhalen', 'Praktijkverhalen'),
  ('opinie', 'Opinie')
on conflict (slug) do nothing;
