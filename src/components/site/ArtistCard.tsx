import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import type { Artist } from "@/lib/data";

export function ArtistCard({ artist, tall = false }: { artist: Artist; tall?: boolean }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(42,33,29,0.4)]">
      <Link
        to="/artists/$slug"
        params={{ slug: artist.slug }}
        className={`relative block overflow-hidden ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
      >
        <img
          src={artist.image}
          alt={`${artist.name}, ${artist.artForm}, ${artist.city}`}
          loading="lazy"
          width={768}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
            artist.available ? "bg-cream/95 text-sage" : "bg-cocoa/85 text-cream"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${artist.available ? "bg-sage animate-pulse-dot" : "bg-rose"}`} />
          {artist.available ? "Available" : "Booked ahead"}
        </span>
        <span className="absolute bottom-3 left-3 right-3 translate-y-3 text-sm font-medium text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {artist.tagline}
        </span>
      </Link>

      <button
        onClick={() => setSaved((v) => !v)}
        aria-label={saved ? `Remove ${artist.name} from saved artists` : `Save ${artist.name}`}
        aria-pressed={saved}
        className="absolute right-3 top-3 rounded-full bg-cream/95 p-2 transition-transform hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-primary text-primary" : "text-cocoa"}`} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to="/artists/$slug" params={{ slug: artist.slug }}>
              <h3 className="truncate font-display text-2xl font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-primary">
                {artist.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-sm font-medium text-primary">{artist.artForm}</p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-foreground">{artist.price}</p>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {artist.city}, {artist.state}
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
        <Link
          to="/artists/$slug"
          params={{ slug: artist.slug }}
          className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary transition-colors hover:text-terracotta"
        >
          View Profile <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
