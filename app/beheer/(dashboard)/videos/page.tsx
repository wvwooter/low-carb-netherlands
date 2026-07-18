import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AddVideoForm } from "./AddVideoForm";
import { VideosList } from "./VideosList";

export default async function BeheerVideosPage() {
  const supabase = createSupabaseServerClient();

  const { data } = supabase
    ? await supabase
        .from("videos")
        .select("id, titel, beschrijving, youtube_url, gepubliceerd, aangemaakt_op")
        .order("aangemaakt_op", { ascending: false })
    : { data: [] };

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-forest-900">
        Video&apos;s
      </h1>
      <p className="mb-8 text-ink-500">
        Voeg YouTube-video&apos;s toe en beheer welke ervan live staan op de site.
      </p>
      <div className="space-y-8">
        <AddVideoForm />
        <VideosList videos={data ?? []} />
      </div>
    </div>
  );
}
