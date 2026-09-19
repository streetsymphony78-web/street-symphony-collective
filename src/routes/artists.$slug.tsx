import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MapPin, Play, Star, X } from "lucide-react";
import { useState } from "react";
import { artists } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import botanical from "@/assets/botanical.png";

export const Route = createFileRoute("/artists/$slug")({
  loader: ({ params }) => {
    const artist = artists.find((a) => a.slug === params.slug);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artist not found — Street Symphony" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.artist;
    const title = `${a.name} — ${a.artForm} in ${a.city} | Street Symphony`;
    return {
      meta: [
        { title },
        { name: "description", content: a.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: a.tagline },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ArtistNotFound,
  errorComponent: ArtistNotFound,
  component: ArtistProfile,
});

function ArtistNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="eyebrow">Off the map</p>
      <h1 className="headline mt-3 text-4xl">We couldn't find that artist.</h1>
      <p className="mt-3 text-muted-foreground">They may have moved, or the link may be out of date.</p>
      <Link
        to="/explore"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-terracotta"
      >
        Explore all artists
      </Link>
    </div>
  );
}

const tabs = ["About", "Story", "Portfolio", "Availability", "Reviews"] as const;

function ArtistProfile() {
  const { artist } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("About");
  const [saved, setSaved] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <article>
      {/* Hero */}
      <header className="relative border-b border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(42,33,29,0.5)]">
                <img
                  src={artist.image}
                  alt={`${artist.name}, ${artist.artForm}`}
                  width={768}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <img src={botanical} alt="" aria-hidden className="absolute -right-8 -top-8 w-24 opacity-80" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                artist.available ? "bg-sage/20 text-sage" : "bg-cocoa/10 text-foreground"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${artist.available ? "bg-sage animate-pulse-dot" : "bg-rose"}`} />
              {artist.availabilityNote}
            </span>
            <h1 className="headline mt-4 text-5xl sm:text-6xl lg:text-7xl">{artist.name}</h1>
            <p className="mt-3 text-xl font-semibold text-primary">{artist.artForm}</p>
            <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden /> {artist.city}, {artist.state}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4 text-sm">
              <div>
                <p className="flex items-center gap-1 font-display text-2xl font-bold">
                  <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
                  {artist.rating}
                </p>
                <p className="text-xs text-muted-foreground">{artist.reviewCount} reviews</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{artist.experienceYears} yrs</p>
                <p className="text-xs text-muted-foreground">Performing</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold">{artist.price}</p>
                <p className="text-xs text-muted-foreground">{artist.priceNote}</p>
              </div>
            </div>

            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{artist.tagline}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
              >
                Book This Artist
              </Link>
              <button
                onClick={() => setSaved((v) => !v)}
                aria-pressed={saved}
                className="inline-flex items-center gap-2 rounded-full border border-cocoa/30 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} aria-hidden />
                {saved ? "Saved" : "Save Artist"}
              </button>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-current={tab === t ? "true" : undefined}
              className={`shrink-0 border-b-2 px-4 py-4 font-display text-sm font-semibold uppercase tracking-widest transition-colors ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
        <div>
          {tab === "About" && (
            <section>
              <h2 className="headline text-3xl">About {artist.name.split(" ")[0]}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{artist.bio}</p>

              <h3 className="headline mt-10 text-2xl">Available for</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {artist.availableFor.map((x) => (
                  <li key={x} className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                    {x}
                  </li>
                ))}
              </ul>

              <h3 className="headline mt-10 text-2xl">Performance formats</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {artist.formats.map((f) => (
                  <li key={f} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>

              <h3 className="headline mt-10 text-2xl">Languages</h3>
              <p className="mt-3 text-muted-foreground">{artist.languages.join(" · ")}</p>
            </section>
          )}

          {tab === "Story" && (
            <section>
              <p className="eyebrow">In their own words</p>
              <h2 className="headline mt-3 text-4xl">The journey.</h2>
              <div className="mt-6 space-y-6">
                {artist.story.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-serif text-2xl italic leading-relaxed text-foreground"
                        : "text-lg leading-relaxed text-muted-foreground"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}

          {tab === "Portfolio" && (
            <section>
              <h2 className="headline text-3xl">Portfolio</h2>
              <p className="mt-2 text-muted-foreground">Photographs and performance recordings.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {artist.portfolio.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(src)}
                    className="group relative overflow-hidden rounded-2xl border border-border"
                    aria-label={`Open media ${i + 1} from ${artist.name}'s portfolio`}
                  >
                    <img
                      src={src}
                      alt={`${artist.name} performance ${i + 1}`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {i % 2 === 1 && (
                      <span className="absolute inset-0 flex items-center justify-center bg-cocoa/35">
                        <span className="rounded-full bg-cream/95 p-4">
                          <Play className="h-5 w-5 fill-primary text-primary" aria-hidden />
                        </span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          {tab === "Availability" && (
            <section>
              <h2 className="headline text-3xl">Availability</h2>
              <p className="mt-2 text-muted-foreground">
                Highlighted dates are currently open. {artist.name.split(" ")[0]} updates this calendar directly.
              </p>
              <div className="mt-6 max-w-md rounded-2xl border border-border bg-card p-6">
                <p className="font-display text-xl font-bold uppercase tracking-wide">October 2026</p>
                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-muted-foreground">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                    const open = artist.availableDays.includes(d);
                    return (
                      <span
                        key={d}
                        title={open ? "Available" : "Unavailable"}
                        className={`flex aspect-square items-center justify-center rounded-lg text-sm ${
                          open
                            ? "bg-sage/20 font-semibold text-foreground ring-1 ring-sage/40"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-3 w-3 rounded bg-sage/20 ring-1 ring-sage/40" aria-hidden /> Available for bookings
                </p>
              </div>
            </section>
          )}

          {tab === "Reviews" && (
            <section>
              <h2 className="headline text-3xl">Reviews</h2>
              <p className="mt-2 text-muted-foreground">
                {artist.rating} average from {artist.reviewCount} verified bookings.
              </p>
              <div className="mt-6 space-y-4">
                {artist.reviews.map((r) => (
                  <figure key={r.name} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden />
                      ))}
                    </div>
                    <blockquote className="mt-3 font-serif text-lg italic leading-relaxed">“{r.quote}”</blockquote>
                    <figcaption className="mt-3 text-sm">
                      <span className="font-semibold">{r.name}</span>
                      <span className="text-muted-foreground"> · {r.role}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Booking sidebar */}
        <aside className="lg:sticky lg:top-36 lg:h-fit">
          <div className="rounded-2xl border border-border bg-peach/60 p-6">
            <p className="eyebrow">Pricing</p>
            <p className="mt-2 font-display text-4xl font-bold">{artist.price}</p>
            <p className="mt-1 text-sm text-muted-foreground">{artist.priceNote}</p>
            <Link
              to="/book"
              className="mt-6 block rounded-full bg-primary px-6 py-3.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Request Booking <span aria-hidden>→</span>
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Typically responds within 2 days. No payment taken until the artist accepts.
            </p>
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio media viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close viewer"
            className="absolute right-5 top-5 rounded-full bg-cream/95 p-2.5"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="Portfolio media enlarged" className="max-h-[85vh] max-w-4xl rounded-2xl object-contain" />
        </div>
      )}
    </article>
  );
}
