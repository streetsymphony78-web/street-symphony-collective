import { Link } from "@tanstack/react-router";
import type { Story } from "@/lib/data";

export function StoryCard({ story, large = false }: { story: Story; large?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(42,33,29,0.4)]">
      <Link
        to="/stories/$slug"
        params={{ slug: story.slug }}
        className={`relative block overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}
      >
        <img
          src={story.image}
          alt={story.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest">
          <span className="text-primary">{story.category}</span>
          <span className="text-muted-foreground">{story.readTime}</span>
        </div>
        <Link to="/stories/$slug" params={{ slug: story.slug }}>
          <h3
            className={`font-display font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-primary ${
              large ? "text-3xl" : "text-2xl"
            }`}
          >
            {story.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{story.excerpt}</p>
        <Link
          to="/stories/$slug"
          params={{ slug: story.slug }}
          className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary transition-colors hover:text-terracotta"
        >
          Read Story <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
