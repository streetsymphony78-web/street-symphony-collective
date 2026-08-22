import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { artists, artForms, cities } from "@/lib/data";
import { ArtistCard } from "@/components/site/ArtistCard";
import { Reveal } from "@/components/site/Reveal";
import { Chip } from "@/components/site/ui";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Artists — Street Symphony" },
      {
        name: "description",
        content:
          "Search and filter India's street and folk artists by art form, city, availability, and budget. Find your next artist.",
      },
      { property: "og:title", content: "Explore Artists — Street Symphony" },
      {
        property: "og:description",
        content: "Search and filter India's street and folk artists by art form, city, availability, and budget.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

const sortOptions = ["Recommended", "Most viewed", "Available soon", "Recently added"] as const;
const budgetOptions = ["Any budget", "Under ₹10,000", "₹10,000–₹20,000", "Above ₹20,000", "Quote available"] as const;

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [budget, setBudget] = useState<string>("Any budget");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Recommended");

  const results = useMemo(() => {
    let list = [...artists];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.artForm.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.state.toLowerCase().includes(q),
      );
    }
    if (form) list = list.filter((a) => a.categories.includes(form));
    if (city) list = list.filter((a) => a.city === city);
    if (onlyAvailable) list = list.filter((a) => a.available);
    if (budget === "Under ₹10,000") list = list.filter((a) => a.price.includes("₹9") || a.price.includes("Quote"));
    if (budget === "₹10,000–₹20,000") list = list.filter((a) => /₹1[0-9],/.test(a.price));
    if (budget === "Above ₹20,000") list = list.filter((a) => /₹2[0-9],/.test(a.price));
    if (budget === "Quote available") list = list.filter((a) => a.price.includes("Quote"));
    if (sort === "Available soon") list.sort((a, b) => Number(b.available) - Number(a.available));
    if (sort === "Most viewed") list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [query, form, city, budget, onlyAvailable, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <p className="eyebrow">Explore artists</p>
        <h1 className="headline mt-3 text-5xl sm:text-6xl">
          Find your next <span className="text-primary">artist.</span>
        </h1>
      </Reveal>

      {/* Search */}
      <Reveal delay={80}>
        <form
          className="mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-input bg-cream p-2 pl-5"
          onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <label htmlFor="explore-search" className="sr-only">
            Search artists, art forms, cities
          </label>
          <input
            id="explore-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, art forms, cities…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </form>
      </Reveal>

      {/* Filters */}
      <Reveal delay={140}>
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden /> Art form
            </span>
            {artForms.map((f) => (
              <Chip key={f} active={form === f} onClick={() => setForm(form === f ? null : f)}>
                {f}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">City</span>
            {cities.map((c) => (
              <Chip key={c} active={city === c} onClick={() => setCity(city === c ? null : c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Budget</span>
            {budgetOptions.map((b) => (
              <Chip key={b} active={budget === b} onClick={() => setBudget(b)}>
                {b}
              </Chip>
            ))}
            <Chip active={onlyAvailable} onClick={() => setOnlyAvailable((v) => !v)}>
              Available now
            </Chip>
          </div>
        </div>
      </Reveal>

      {/* Sort + count */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground" role="status">
          <span className="font-semibold text-foreground">{results.length}</span> artist
          {results.length === 1 ? "" : "s"} found
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-input bg-cream px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((a, i) => (
            <Reveal key={a.slug} delay={Math.min(i, 6) * 60}>
              <ArtistCard artist={a} tall={i % 3 === 0} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-border bg-cream p-14 text-center">
          <p className="headline text-3xl">No voices match — yet.</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            Try widening your filters. New artists join the archive every week.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setForm(null);
              setCity(null);
              setBudget("Any budget");
              setOnlyAvailable(false);
            }}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-terracotta"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
