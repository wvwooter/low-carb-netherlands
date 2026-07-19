"use client";

import { useState } from "react";

interface LiteYoutubeEmbedProps {
  videoId: string;
  title: string;
  thumbnailUrl: string;
}

/**
 * Lichtgewicht YouTube-embed: toont alleen een thumbnail-afbeelding totdat de
 * gebruiker op play klikt. Pas dan wordt de echte (zware) YouTube-iframe
 * geladen. Nodig omdat de site tientallen video's tegelijk toont — als elke
 * video meteen een live iframe zou laden, loopt vooral mobiel vast.
 */
export function LiteYoutubeEmbed({ videoId, title, thumbnailUrl }: LiteYoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block h-full w-full cursor-pointer"
      aria-label={`Video afspelen: ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-forest-900">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
