import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { events } from "@/lib/data";
import { EventCard } from "@/components/site/EventCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Showcases — Street Symphony" },
      {
        name: "description",
        content:
          "Upcoming folk and street performances across India, plus a growing archive of past showcases, lineups, and photo stories.",
      },
      { property: "og:title", content: "Events & Showcases — Street Symphony" },
      {
        property: "og:description",
        content: "Upcoming folk and street performances across India, plus an archive of past showcases.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const list = events.filter((e) => (tab === "Upcoming" ? !e.past : e.past));

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <p className="eyebrow">Events & showcases</p>
        <h1 className="headline mt-3 max-w-2xl text-5xl sm:text-6xl">
          Where artists meet <span className="text-primary">audiences.</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Courtyard sessions, festival stages, school workshops, and street showcases — staged with the artists, never
          around them.
        </p>
      </Reveal>

      <div className="mt-10 flex gap-1 border-b border-border">
        {(["Upcoming", "Past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-current={tab === t ? "true" : undefined}
            className={`border-b-2 px-5 py-3 font-display text-sm font-semibold uppercase tracking-widest transition-colors ${
              tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t} ({events.filter((e) => (t === "Upcoming" ? !e.past : e.past)).length})
          </button>
        ))}
      </div>

      {tab === "Past" && (
        <p className="mt-6 max-w-xl text-sm text-muted-foreground">
          Past events become part of the cultural archive — photographs, lineups, venues, and the story of the night.
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <Reveal key={e.slug} delay={i * 80}>
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
