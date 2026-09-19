import { createFileRoute, Link } from "@tanstack/react-router";
import { artists, impactExtended, impactStats } from "@/lib/data";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatBlock } from "@/components/site/ui";
import botanical from "@/assets/botanical.png";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — Street Symphony" },
      {
        name: "description",
        content:
          "Visibility becomes opportunity: artists documented, paid bookings, performances organised, and the livelihoods behind the numbers.",
      },
      { property: "og:title", content: "Impact — Street Symphony" },
      {
        property: "og:description",
        content: "Artists documented, paid bookings, performances organised — and the livelihoods behind the numbers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  const cases = artists.slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow">Impact</p>
          <h1 className="headline mt-3 max-w-2xl text-5xl sm:text-7xl">
            Visibility becomes <span className="text-primary">opportunity.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We don't measure success in attention. We measure it in diaries filling up, fees rising, traditions being
            taught, and artists deciding for themselves what comes next.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <StatBlock value={String(s.value)} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {impactExtended.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <StatBlock value={String(s.value)} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-cocoa text-cream">
        <img src={botanical} alt="" aria-hidden className="absolute -right-6 top-4 w-48 rotate-[25deg] opacity-25" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="headline max-w-3xl text-4xl sm:text-5xl">
              A booking is not a transaction. It is <span className="text-brick">a season of rent paid.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
              Most street and folk artists have no agent, no portfolio, and no consistent route to paying audiences. A
              searchable profile changes that arithmetic: one documented artist reaches organisers who were always
              looking but never knew where to look.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Case studies" title="The numbers have names." />
        </Reveal>
        <div className="mt-10 space-y-8">
          {cases.map((a, i) => (
            <Reveal key={a.slug} delay={i * 90}>
              <article className="grid items-center gap-8 rounded-2xl border border-border bg-card p-6 md:grid-cols-[240px_1fr]">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="aspect-[4/5] w-full rounded-xl object-cover"
                />
                <div>
                  <p className="eyebrow">
                    Artist story / {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="headline mt-2 text-3xl">{a.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {a.artForm} · {a.city}, {a.state}
                  </p>
                  <blockquote className="mt-5 font-serif text-xl italic leading-relaxed">“{a.story[0]}”</blockquote>
                  <div className="mt-6 flex flex-wrap gap-6 border-t border-border pt-4 text-sm">
                    <div>
                      <p className="font-display text-2xl font-bold text-primary">{a.reviewCount}</p>
                      <p className="text-xs text-muted-foreground">Bookings completed</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-primary">{a.experienceYears} yrs</p>
                      <p className="text-xs text-muted-foreground">Practising the form</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-primary">{a.rating}</p>
                      <p className="text-xs text-muted-foreground">Average rating</p>
                    </div>
                  </div>
                  <Link
                    to="/artists/$slug"
                    params={{ slug: a.slug }}
                    className="mt-6 inline-block text-sm font-semibold text-primary hover:text-terracotta"
                  >
                    Read their story <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
