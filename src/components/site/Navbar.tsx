import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "@/lib/auth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Artists" },
  { to: "/events", label: "Events" },
  { to: "/stories", label: "Stories" },
  { to: "/impact", label: "Impact" },
  { to: "/partner", label: "Partner With Us" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-cream/20 bg-cocoa/90 text-cream backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_6px_24px_-12px_rgba(42,33,29,0.25)]" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:h-24 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center" aria-label="Street Symphony home">
          <img
            src="/street-symphony-logo.png"
            alt="Street Symphony"
            className="h-12 w-auto max-w-[280px] object-contain sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-cream/80 transition-colors hover:text-cream"
              activeProps={{ className: "text-cream font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full px-4 py-2 text-sm font-semibold text-cream transition-colors hover:text-cream/80"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut();
                  navigate({ to: "/" });
                }}
                className="rounded-full border border-cream/25 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="rounded-full px-4 py-2 text-sm font-semibold text-cream transition-colors hover:text-cream/80"
              >
                Log In
              </Link>
              <Link
                to="/join"
                className="rounded-full border border-cream/30 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                Join Us
              </Link>
            </>
          )}
          <Link
            to="/book"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
          >
            Book an Artist
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/book"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Book
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-full border border-cream/25 p-2 text-cream"
          >
            {open ? <Menu className="hidden" /> : null}
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-6 pt-3 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-display text-lg font-semibold uppercase tracking-wide text-foreground/85 hover:bg-accent"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2">
              {session ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full border border-border px-4 py-3 text-center text-sm font-semibold"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                      navigate({ to: "/" });
                    }}
                    className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-semibold"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full border border-border px-4 py-3 text-center text-sm font-semibold"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/join"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Join Us
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
