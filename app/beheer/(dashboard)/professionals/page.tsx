import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProfessionalsList } from "./ProfessionalsList";

export default async function BeheerProfessionalsPage() {
  const supabase = createSupabaseServerClient();

  const { data } = supabase
    ? await supabase
        .from("professionals")
        .select("id, naam, beroep, locatie, provincie, email, goedkeuringsstatus, zichtbaar")
        .order("naam", { ascending: true })
    : { data: [] };

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Professionals
      </h1>
      <p className="mb-8 text-ink-500">
        Beheer de zichtbaarheid van professionals in de openbare gids.
      </p>
      <ProfessionalsList professionals={data ?? []} />
    </div>
  );
}
