import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { stories, storyCategories } from "@/lib/data";
import { StoryCard } from "@/components/site/StoryCard";
import { Reveal } from "@/components/site/Reveal";
import { Chip } from "@/components/site/ui";

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Stories from the Streets — Street Symphony" },
      {
        name: "description",
        content:
          "An independent cultural magazine and living archive: artist stories, folk traditions, photo essays, and heritage reporting from across India.",
      },
      { property: "og:title", content: "Stories from the Streets — Street Symphony" },
      {
        property: "og:description",
        content: "Artist stories, folk traditions, photo essays, and heritage reporting from across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? stories : stories.filter((s) => s.category === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <p className="eyebrow">Stories & digital archive</p>
        <h1 className="headline mt-3 max-w-2xl text-5xl sm:text-6xl">
          Stories from the <span className="text-primary">streets.</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Reporting, photo essays, and oral history from India's living traditions — written with the artists, not about
          them.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 flex flex-wrap gap-2">
          {storyCategories.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </Reveal>

      {list.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 5) * 70}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-14 rounded-2xl border border-dashed border-border bg-cream p-14 text-center">
          <p className="headline text-3xl">Nothing filed here yet.</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Our writers are out reporting. Try another category in the meantime.
          </p>
        </div>
      )}
    </div>
  );
}
