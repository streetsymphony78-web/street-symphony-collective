import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { artists, events, images, impactStats, regions, stories, testimonials } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ArtistCard } from "@/components/site/ArtistCard";
import { EventCard } from "@/components/site/EventCard";
import { StoryCard } from "@/components/site/StoryCard";
import { Chip, StatBlock } from "@/components/site/ui";
import botanical from "@/assets/botanical.png";
import mapIndia from "@/assets/map-india.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Street Symphony — Discover the voices that make India sing" },
      {
        name: "description",
        content:
          "Meet the street and folk artists keeping India's living traditions alive. Discover their stories, experience their work, and book them for your next event.",
      },
      { property: "og:title", content: "Street Symphony — Discover the voices that make India sing" },
      {
        property: "og:description",
        content:
          "Meet the street and folk artists keeping India's living traditions alive. Discover their stories, experience their work, and book them for your next event.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const quickFilters = ["Music", "Dance", "Theatre", "Storytelling", "Puppetry", "Folk Arts", "Street Performance"];

function HomePage() {
  return (
    <>
      <Hero />
      <DiscoveryBar />
      <FeaturedArtists />
      <CulturalStatement />
      <HowItWorks />
      <ArtistsAcrossIndia />
      <UpcomingEvents />
      <StoriesSection />
      <ImpactSection />
      <SuccessStory />
      <TestimonialsSection />
      <PartnerCta />
    </>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:pt-20">
        <Reveal>
          <p className="eyebrow">India's living culture</p>
          <h1 className="headline mt-4 text-[17vw] sm:text-7xl lg:text-[5.4rem]">
            Discover the
            <br />
            voices that
            <br />
            make <span className="text-primary">India</span>
            <br />
            sing.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Meet the street and folk artists keeping India's living traditions alive. Discover their stories,
            experience their work, and bring their art to your next event.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/explore"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Explore Artists
            </Link>
            <Link
              to="/book"
              className="rounded-full border border-cocoa/30 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Book an Artist
            </Link>
            <Link to="/join" className="px-2 py-3 text-sm font-semibold text-primary hover:text-terracotta">
              Join as an Artist <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Editorial collage */}
        <Reveal delay={150} className="relative">
          <div className="relative mx-auto hidden h-[560px] max-w-lg lg:block">
            <div className="absolute left-0 top-6 w-[62%] rotate-[-2deg] overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(42,33,29,0.5)]">
              <img
                src={images.heroPortrait}
                alt="Elderly street musician playing a ravanhatta in Jaipur"
                width={768}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute right-0 top-0 w-[46%] rotate-[2.5deg] overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(42,33,29,0.45)]">
              <img
                src={images.heroPerformance}
                alt="Folk dancer performing in a lantern-lit courtyard"
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-24 right-6 w-[38%] rotate-[-1.5deg] overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(42,33,29,0.45)]">
              <img
                src={images.heroInstrument}
                alt="Hands with henna playing a dholak drum"
                loading="lazy"
                width={768}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-6 w-[52%] rotate-[1.5deg] overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(42,33,29,0.45)]">
              <img
                src={images.heroAudience}
                alt="Children watching a street performance in an old Delhi lane"
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="absolute -left-2 bottom-40 inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 text-xs font-semibold shadow-md">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden /> Jaipur, Rajasthan
            </span>
            <p className="caption-rule absolute -bottom-8 right-2 max-w-[220px] text-xs italic text-muted-foreground">
              Courtyard Sessions, Jaipur — the audience arrived before the lamps were lit.
            </p>
            <img
              src={botanical}
              alt=""
              aria-hidden
              className="animate-float-soft absolute -right-10 bottom-24 w-32 opacity-90"
            />
            <span className="absolute right-16 top-[46%] h-10 w-10 rounded-full border-2 border-primary/60" aria-hidden />
          </div>

          {/* Mobile collage: simple stacked pair */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <img
              src={images.heroPortrait}
              alt="Elderly street musician playing a ravanhatta in Jaipur"
              width={768}
              height={1024}
              className="aspect-[3/4] w-full rounded-2xl border border-border object-cover"
            />
            <img
              src={images.heroPerformance}
              alt="Folk dancer performing in a lantern-lit courtyard"
              loading="lazy"
              width={1024}
              height={768}
              className="mt-8 aspect-[3/4] w-full rounded-2xl border border-border object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Discovery bar ---------------- */

function DiscoveryBar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="border-y border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="headline text-3xl sm:text-4xl">What are you looking for?</h2>
          <form
          className="mt-6 flex max-w-2xl items-center gap-2 rounded-full border border-input bg-background p-2 pl-5"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <label htmlFor="home-search" className="sr-only">
            Search artists, art forms, cities
          </label>
          <input
            id="home-search"
            placeholder="Search artists, art forms, cities…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <Link
            to="/explore"
            className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
          >
            Search
          </Link>
        </form>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {quickFilters.map((f) => (
            <Chip key={f} active={active === f} onClick={() => setActive(active === f ? null : f)}>
              {f}
            </Chip>
          ))}
          <Link to="/explore" className="ml-2 text-sm font-semibold text-primary hover:text-terracotta">
            Explore All Artists <span aria-hidden>→</span>
          </Link>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Featured artists ---------------- */

function FeaturedArtists() {
  const featured = artists.filter((a) => a.featured);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured artists"
            title={
              <>
                Meet the <span className="text-primary">artists.</span>
              </>
            }
            description="Extraordinary people. Living traditions. New audiences."
          />
          <Link to="/explore" className="text-sm font-semibold text-primary hover:text-terracotta">
            View All Artists <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((a, i) => (
          <Reveal key={a.slug} delay={i * 90}>
            <ArtistCard artist={a} tall={i % 2 === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Cultural statement ---------------- */

function CulturalStatement() {
  return (
    <section className="relative overflow-hidden bg-cocoa text-cream">
      <img src={botanical} alt="" aria-hidden className="absolute -right-8 -top-8 w-56 rotate-45 opacity-25" />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="headline max-w-4xl text-4xl sm:text-6xl lg:text-7xl">
            Culture is not
            <br />
            something to watch
            <br />
            <span className="text-brick">from a distance.</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75">
            It lives in streets, courtyards, festivals, neighbourhoods, voices, rhythms, stories, and people.
          </p>
          <div className="mt-10 h-1 w-24 rounded-full bg-primary" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

const steps = [
  {
    n: "01",
    title: "Discover",
    text: "Find artists by art form, city, event type, budget, and availability.",
  },
  {
    n: "02",
    title: "Connect",
    text: "Explore their stories, portfolios, performances, and availability.",
  },
  {
    n: "03",
    title: "Book",
    text: "Send a request and bring an authentic cultural experience to your event.",
  },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading eyebrow="How it works" title="Three steps to a living stage." align="center" />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <div className="relative h-full rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-display text-6xl font-bold text-primary/25">{s.n}</p>
              <h3 className="headline mt-3 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-border bg-card" aria-hidden />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Artists across India ---------------- */

function ArtistsAcrossIndia() {
  return (
    <section className="border-y border-border bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <img src={mapIndia} alt="Stylised hand-drawn map of India with artist location markers" loading="lazy" width={768} height={1024} className="w-full" />
            <span className="absolute left-[30%] top-[38%] h-3 w-3 rounded-full bg-primary animate-pulse-dot" aria-hidden />
            <span className="absolute left-[45%] top-[55%] h-3 w-3 rounded-full bg-burnt animate-pulse-dot" style={{ animationDelay: "0.6s" }} aria-hidden />
            <span className="absolute left-[38%] top-[75%] h-3 w-3 rounded-full bg-sage animate-pulse-dot" style={{ animationDelay: "1.2s" }} aria-hidden />
          </div>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Artists across India"
            title={
              <>
                Every region has <span className="text-primary">a voice.</span>
              </>
            }
            description="From Manganiyar ballads in the Thar to Baul songs on the Hooghly — discover artists by region and tradition."
          />
          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {regions.map((r) => (
              <li key={r.name}>
                <Link
                  to="/explore"
                  className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:border-primary"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.specialty}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    {r.artists}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Events ---------------- */

function UpcomingEvents() {
  const upcoming = events.filter((e) => !e.past).slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Events & showcases"
            title={
              <>
                Where artists
                <br />
                meet <span className="text-primary">audiences.</span>
              </>
            }
          />
          <Link to="/events" className="text-sm font-semibold text-primary hover:text-terracotta">
            View All Events <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {upcoming.map((e, i) => (
          <Reveal key={e.slug} delay={i * 90}>
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Stories ---------------- */

function StoriesSection() {
  const [lead, ...rest] = stories;
  return (
    <section className="border-y border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Stories & digital archive"
              title={
                <>
                  Stories from
                  <br />
                  the <span className="text-primary">streets.</span>
                </>
              }
            />
            <Link to="/stories" className="text-sm font-semibold text-primary hover:text-terracotta">
              Explore All Posts <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <StoryCard story={lead} large />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {rest.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Impact ---------------- */

function ImpactSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Impact"
          title={
            <>
              Visibility becomes <span className="text-primary">opportunity.</span>
            </>
          }
          description="Every profile, story, and booking turns attention into livelihood. Discovery is not the end of the journey — it's the beginning of a sustainable one."
          align="center"
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {impactStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <StatBlock value={String(s.value)} suffix={s.suffix} label={s.label} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 text-center">
        <Link to="/impact" className="text-sm font-semibold text-primary hover:text-terracotta">
          See the full impact report <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}

/* ---------------- Success story ---------------- */

function SuccessStory() {
  const meera = artists[0];
  return (
    <section className="border-y border-border bg-peach/50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(42,33,29,0.5)]">
              <img
                src={meera.image}
                alt="Meera Rathore, Rajasthani folk singer, against a Jaipur sandstone wall"
                loading="lazy"
                width={768}
                height={1024}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <img src={botanical} alt="" aria-hidden className="absolute -left-10 -top-10 w-28 -scale-x-100 opacity-80" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Artist story / 01</p>
          <blockquote className="mt-6 font-serif text-3xl italic leading-snug text-foreground sm:text-4xl">
            “People had been listening to us for years. Now they know where to find us.”
          </blockquote>
          <div className="mt-8 border-l-2 border-primary pl-4">
            <p className="font-display text-xl font-bold uppercase tracking-tight">{meera.name}</p>
            <p className="text-sm text-muted-foreground">
              {meera.artForm} · {meera.city}, {meera.state}
            </p>
          </div>
          <Link
            to="/artists/$slug"
            params={{ slug: meera.slug }}
            className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-terracotta"
          >
            Read Their Story <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

const toneClass: Record<string, string> = {
  cream: "bg-cream",
  rose: "bg-rose/30",
  peach: "bg-peach",
};

function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Voices about the voices"
          title={
            <>
              What the community <span className="text-primary">says.</span>
            </>
          }
          align="center"
        />
      </Reveal>
      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 60}>
            <figure className={`break-inside-avoid rounded-2xl border border-border p-6 ${toneClass[t.tone]}`}>
              <blockquote className="font-serif text-lg italic leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {t.image ? (
                  <img src={t.image} alt={t.name} loading="lazy" width={768} height={1024} className="h-11 w-11 rounded-full border border-border object-cover" />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cocoa font-display text-sm font-bold uppercase text-cream">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Partner CTA ---------------- */

function PartnerCta() {
  return (
    <section className="relative overflow-hidden bg-cocoa text-cream">
      <img src={botanical} alt="" aria-hidden className="absolute -left-10 bottom-0 w-52 rotate-12 opacity-25" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-brick">Partner with us</p>
          <h2 className="headline mx-auto mt-4 max-w-3xl text-4xl sm:text-6xl">
            Bring culture into <span className="text-brick">your space.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/75">
            Schools, cafés, festivals, corporates, and community spaces — host authentic performances that your
            audience will never forget.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/partner"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brick"
            >
              Start a Partnership <span aria-hidden>→</span>
            </Link>
            <Link
              to="/book"
              className="rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              Book an Artist
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
