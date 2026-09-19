import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { artists, stories } from "@/lib/data";
import { StoryCard } from "@/components/site/StoryCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.slug === params.slug);
    if (!story) throw notFound();
    const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);
    const artist = story.relatedArtist ? artists.find((a) => a.slug === story.relatedArtist) : undefined;
    return { story, related, artist };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Story not found — Street Symphony" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.story;
    const title = `${s.title} — Street Symphony`;
    return {
      meta: [
        { title },
        { name: "description", content: s.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: s.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: StoryNotFound,
  errorComponent: StoryNotFound,
  component: StoryArticle,
});

function StoryNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="eyebrow">Out of print</p>
      <h1 className="headline mt-3 text-4xl">We couldn't find that story.</h1>
      <Link
        to="/stories"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-terracotta"
      >
        Back to all stories
      </Link>
    </div>
  );
}

function StoryArticle() {
  const { story, related, artist } = Route.useLoaderData();

  return (
    <article>
      <div className="relative">
        <img
          src={story.image}
          alt={story.title}
          width={1024}
          height={768}
          className="h-[46vh] min-h-[320px] w-full object-cover sm:h-[58vh]"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Reveal>
          <p className="eyebrow">{story.category}</p>
          <h1 className="headline mt-4 text-4xl sm:text-6xl">{story.title}</h1>
          <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{story.author}</span>
            <span aria-hidden>·</span>
            <span>{story.date}</span>
            <span aria-hidden>·</span>
            <span>{story.readTime}</span>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-10 font-serif text-2xl italic leading-relaxed text-foreground sm:text-3xl">{story.lede}</p>

          <div className="mt-8 space-y-6">
            {story.body.map((p, i) => (
              <div key={i}>
                <p className="text-lg leading-[1.85] text-foreground/85">{p}</p>
                {i === 0 && (
                  <blockquote className="my-10 border-l-4 border-primary pl-6 font-serif text-2xl italic leading-snug text-foreground">
                    “{story.pullQuote}”
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {artist && (
          <Reveal>
            <aside className="mt-14 flex flex-wrap items-center gap-5 rounded-2xl border border-border bg-peach/50 p-6">
              <img
                src={artist.image}
                alt={artist.name}
                loading="lazy"
                width={768}
                height={1024}
                className="h-20 w-20 shrink-0 rounded-full border border-border object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="eyebrow">Artist in this story</p>
                <p className="mt-1 font-display text-2xl font-bold uppercase tracking-tight">{artist.name}</p>
                <p className="text-sm text-muted-foreground">
                  {artist.artForm} · {artist.city}
                </p>
              </div>
              <Link
                to="/artists/$slug"
                params={{ slug: artist.slug }}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-terracotta"
              >
                View Profile
              </Link>
            </aside>
          </Reveal>
        )}
      </div>

      <section className="border-t border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="headline text-3xl">Related stories</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
