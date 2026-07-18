import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Video's",
  description: "Video's en lezingen over low-carb en metabole gezondheid.",
};

async function getVideos() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("videos")
    .select("id, titel, beschrijving, youtube_url")
    .eq("gepubliceerd", true)
    .order("aangemaakt_op", { ascending: false });

  return data ?? [];
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold text-forest-900">
            Video&apos;s
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            Lezingen, interviews en uitlegvideo&apos;s over low-carb en
            metabole gezondheid.
          </p>
        </div>

        {videos.length === 0 ? (
          <Card className="mt-10 border-dashed text-center">
            <p className="text-ink-600">
              Er zijn nog geen video&apos;s geplaatst. Heb je een video of
              lezing die hier past?{" "}
              <a href="/contact" className="text-forest-800 underline">
                Draag hem aan via het contactformulier
              </a>
              .
            </p>
          </Card>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {videos.map((video) => {
              const embedUrl = getYoutubeEmbedUrl(video.youtube_url);
              return (
                <Card key={video.id} className="overflow-hidden p-0">
                  {embedUrl && (
                    <div className="aspect-video w-full">
                      <iframe
                        src={embedUrl}
                        title={video.titel}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="font-serif text-lg font-semibold text-forest-900">
                      {video.titel}
                    </h2>
                    {video.beschrijving && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">
                        {video.beschrijving}
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
