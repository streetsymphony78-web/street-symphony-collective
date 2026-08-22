import type { EventItem } from "@/lib/data";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(42,33,29,0.4)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-xl bg-cream/95 px-3 py-2 text-center shadow-sm">
          <p className="font-display text-2xl font-bold leading-none">{event.day}</p>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{event.month}</p>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-cocoa/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight">{event.name}</h3>
        <p className="text-sm text-muted-foreground">
          {event.venue} · {event.city} · {event.date}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Lineup:</span> {event.lineup.join(", ")}
        </p>
        {!event.past && (
          <button className="mt-auto w-fit rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            Attend / Register
          </button>
        )}
      </div>
    </article>
  );
}
