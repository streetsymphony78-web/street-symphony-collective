import { Link } from "@tanstack/react-router";
import { useState } from "react";

const columns = [
  {
    title: "Discover",
    links: [
      { label: "Explore Artists", to: "/explore" },
      { label: "Events", to: "/events" },
      { label: "Stories", to: "/stories" },
      { label: "Impact", to: "/impact" },
    ],
  },
  {
    title: "For Artists",
    links: [
      { label: "Join as an Artist", to: "/join" },
      { label: "Artist Login", to: "/auth" },
      { label: "Artist Support", to: "/contact" },
    ],
  },
  {
    title: "For Bookers",
    links: [
      { label: "Book an Artist", to: "/book" },
      { label: "Booker Login", to: "/auth" },
      { label: "Booking Support", to: "/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Partner With Us", to: "/partner" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-border bg-cocoa text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight">
              Street
              <br />
              <span className="text-brick">Symphony</span>
            </p>
            <p className="mt-4 max-w-xs font-serif italic text-cream/80">
              “Discover the voices that make India sing.”
            </p>

            <div className="mt-8">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-brick">
                Stay in the loop.
              </p>
              <p className="mt-2 text-sm text-cream/70">
                Stories, artists, events, and cultural discoveries — occasionally, not constantly.
              </p>
              {subscribed ? (
                <p className="mt-4 rounded-xl border border-cream/20 bg-cream/10 px-4 py-3 text-sm">
                  You're in. The next story is on its way.
                </p>
              ) : (
                <form
                  className="mt-4 flex max-w-sm gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Your email
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full rounded-full border border-cream/25 bg-transparent px-4 py-2.5 text-sm placeholder:text-cream/50 focus:border-brick focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brick"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brick">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-cream/75 transition-colors hover:text-cream">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-5">
            <span className="cursor-pointer transition-colors hover:text-cream">Privacy</span>
            <span className="cursor-pointer transition-colors hover:text-cream">Terms</span>
            <span className="cursor-pointer transition-colors hover:text-cream">Accessibility</span>
          </div>
          <div className="flex gap-5">
            <span className="cursor-pointer font-display text-sm font-semibold uppercase tracking-widest transition-colors hover:text-cream">
              Instagram
            </span>
            <span className="cursor-pointer font-display text-sm font-semibold uppercase tracking-widest transition-colors hover:text-cream">
              YouTube
            </span>
            <span className="cursor-pointer font-display text-sm font-semibold uppercase tracking-widest transition-colors hover:text-cream">
              LinkedIn
            </span>
          </div>
          <p>© 2026 Street Symphony. India's living culture, one artist at a time.</p>
        </div>
      </div>
    </footer>
  );
}
