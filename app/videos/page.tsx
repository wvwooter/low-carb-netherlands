import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getYoutubeEmbedUrl } from "@/lib/youtube";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Video's",
  description: "Video's en lezingen over low-carb en metabole gezondheid.",
  ...canonical("/videos"),
};

type Video = {
  id: string;
  titel: string;
  beschrijving: string | null;
  youtube_url: string;
  bron: string | null;
};

async function getVideos(): Promise<Video[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("videos")
    .select("id, titel, beschrijving, youtube_url, bron")
    .eq("gepubliceerd", true)
    .order("aangemaakt_op", { ascending: false });

  return data ?? [];
}

function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
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
              <h3 className="font-serif text-lg font-semibold text-forest-900">
                {video.titel}
              </h3>
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
  );
}

export default async function VideosPage() {
  const videos = await getVideos();

  const eigenVideos = videos.filter((v) => !v.bron);
  const groepen = new Map<string, Video[]>();
  for (const video of videos) {
    if (!video.bron) continue;
    const lijst = groepen.get(video.bron) ?? [];
    lijst.push(video);
    groepen.set(video.bron, lijst);
  }

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
          <div className="mt-10 space-y-16">
            {eigenVideos.length > 0 && <VideoGrid videos={eigenVideos} />}

            {Array.from(groepen.entries()).map(([bron, lijst]) => (
              <div key={bron}>
                <h2 className="mb-6 font-serif text-2xl font-semibold text-forest-900">
                  {bron}
                </h2>
                <VideoGrid videos={lijst} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
