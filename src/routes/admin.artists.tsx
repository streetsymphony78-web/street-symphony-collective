import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ImagePlus, LogOut, Save } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import {
  createArtistProfile,
  type ArtistProfileInput,
  uploadArtistImage,
} from "@/lib/artist-profiles";
import { getSupabaseErrorMessage, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/artists")({
  head: () => ({
    meta: [
      { title: "Artist administration — Street Symphony" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminArtistsPage,
});

type AuthStatus = "checking" | "signed-out" | "admin" | "denied" | "unconfigured";

type ArtistDraft = {
  name: string;
  phone: string;
  slug: string;
  artForm: string;
  categories: string;
  city: string;
  state: string;
  region: string;
  tagline: string;
  bio: string;
  story: string;
  price: string;
  priceNote: string;
  availabilityNote: string;
  availableDays: string;
  rating: string;
  reviewCount: string;
  experienceYears: string;
  languages: string;
  availableFor: string;
  formats: string;
  portfolio: string;
  reviews: string;
  quote: string;
  available: boolean;
  featured: boolean;
  isPublished: boolean;
};

const blankDraft: ArtistDraft = {
  name: "",
  phone: "",
  slug: "",
  artForm: "",
  categories: "",
  city: "",
  state: "",
  region: "",
  tagline: "",
  bio: "",
  story: "",
  price: "",
  priceNote: "",
  availabilityNote: "Available for bookings",
  availableDays: "",
  rating: "0",
  reviewCount: "0",
  experienceYears: "0",
  languages: "",
  availableFor: "",
  formats: "",
  portfolio: "",
  reviews: "",
  quote: "",
  available: true,
  featured: false,
  isPublished: true,
};

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-input bg-cream px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";
const labelClass = "block text-sm font-semibold text-foreground";

function listFromText(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function AdminArtistsPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState(blankDraft);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setAuthStatus("unconfigured");
      return;
    }

    let active = true;
    const checkSession = async () => {
      const { data, error: sessionError } = await client.auth.getSession();
      if (!active) return;
      if (sessionError || !data.session) {
        setAuthStatus("signed-out");
      } else if (data.session.user.app_metadata["role"] === "admin") {
        setAuthStatus("admin");
      } else {
        setAuthStatus("denied");
        void client.auth.signOut();
      }
    };

    void checkSession();
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      if (!session) {
        setAuthStatus("signed-out");
      } else if (session.user.app_metadata["role"] === "admin") {
        setAuthStatus("admin");
      } else {
        setAuthStatus("denied");
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const setField = <K extends keyof ArtistDraft>(key: K, value: ArtistDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const client = supabase;
    if (!client) {
      setError("Supabase is not configured.");
      return;
    }

    setPending(true);
    const { data, error: loginError } = await client.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
    } else if (data.user?.app_metadata["role"] !== "admin") {
      await client.auth.signOut();
      setAuthStatus("denied");
      setError("This account does not have administrator access.");
    } else {
      setAuthStatus("admin");
    }
    setPending(false);
  };

  const handleCreateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!imageFile) {
      setError("Choose a profile image before publishing the artist.");
      return;
    }

    const slug = (draft.slug || draft.name)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (!slug) {
      setError("Enter a name or profile URL slug.");
      return;
    }

    setPending(true);
    try {
      const imageUrl = await uploadArtistImage(imageFile, slug);
      const reviews = draft.reviews
        .split(/\r?\n/)
        .map((line) => line.split("|").map((part) => part.trim()))
        .filter(
          (parts): parts is [string, string, string, ...string[]] =>
            parts.length >= 3 && Boolean(parts[0]) && Boolean(parts[2]),
        )
        .map(([name, role, quote]) => ({ name, role, quote }));

      const profile: ArtistProfileInput = {
        name: draft.name.trim(),
        phone: draft.phone.trim(),
        slug,
        art_form: draft.artForm.trim(),
        categories: listFromText(draft.categories),
        city: draft.city.trim(),
        state: draft.state.trim(),
        region: draft.region.trim(),
        image_url: imageUrl,
        tagline: draft.tagline.trim(),
        bio: draft.bio.trim(),
        story: draft.story.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean),
        price: draft.price.trim(),
        price_note: draft.priceNote.trim(),
        available: draft.available,
        availability_note: draft.availabilityNote.trim(),
        available_days: listFromText(draft.availableDays)
          .map(Number)
          .filter((day) => Number.isInteger(day) && day >= 1 && day <= 31),
        rating: Number(draft.rating) || 0,
        review_count: Number(draft.reviewCount) || 0,
        experience_years: Number(draft.experienceYears) || 0,
        languages: listFromText(draft.languages),
        available_for: listFromText(draft.availableFor),
        formats: listFromText(draft.formats),
        portfolio: [imageUrl, ...listFromText(draft.portfolio)],
        reviews,
        featured: draft.featured,
        quote: draft.quote.trim() || null,
        is_published: draft.isPublished,
      };

      await createArtistProfile(profile);
      setDraft(blankDraft);
      setImageFile(null);
      setImageInputKey((current) => current + 1);
      setSuccess(`Artist profile published at /artists/${slug}.`);
    } catch (submitError) {
      setError(getSupabaseErrorMessage(submitError));
    } finally {
      setPending(false);
    }
  };

  if (authStatus === "checking") {
    return <AdminMessage>Checking administrator access…</AdminMessage>;
  }

  if (authStatus === "unconfigured") {
    return <AdminMessage>Supabase is not configured for this environment.</AdminMessage>;
  }

  if (authStatus !== "admin") {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-14 sm:px-6">
        <section className="w-full rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
          <p className="eyebrow text-center">Restricted access</p>
          <h1 className="headline mt-2 text-center text-3xl">Administrator sign in</h1>
          {authStatus === "denied" ? (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              This account is not an administrator. Use an approved admin account.
            </p>
          ) : null}
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
          {authStatus === "denied" ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setAuthStatus("signed-out");
              }}
              className="mt-5 w-full rounded-full border border-border px-4 py-2.5 text-sm font-semibold"
            >
              Use another account
            </button>
          ) : (
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <label className={labelClass}>
                Email
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {pending ? "Signing in…" : "Sign in"}
              </button>
            </form>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow">Artist administration</p>
          <h1 className="headline mt-2 text-4xl">Add an artist profile</h1>
        </div>
        <button
          type="button"
          onClick={() => void supabase?.auth.signOut()}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent"
        >
          <LogOut className="h-4 w-4" aria-hidden /> Sign out
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden /> {success}
        </p>
      ) : null}

      <form onSubmit={handleCreateProfile} className="mt-8 space-y-9">
        <section>
          <h2 className="font-display text-xl font-bold uppercase">Profile</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Artist name *
              <input required value={draft.name} onChange={(event) => setField("name", event.target.value)} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Contact phone *
              <input required type="tel" value={draft.phone} onChange={(event) => setField("phone", event.target.value)} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Profile URL slug
              <input value={draft.slug} onChange={(event) => setField("slug", event.target.value)} placeholder="Generated from name if blank" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Art form *
              <input required value={draft.artForm} onChange={(event) => setField("artForm", event.target.value)} className={fieldClass} />
            </label>
            <label className={labelClass}>
              Categories *
              <input required value={draft.categories} onChange={(event) => setField("categories", event.target.value)} placeholder="Music, Folk Arts" className={fieldClass} />
            </label>
            <label className={labelClass}>
              Profile photo *
              <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-input bg-cream px-3.5 py-2.5 text-sm font-normal">
                <ImagePlus className="h-4 w-4 shrink-0" aria-hidden />
                <input key={imageInputKey} required type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] ?? null)} className="min-w-0 w-full text-xs" />
              </span>
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Tagline *
              <input required value={draft.tagline} onChange={(event) => setField("tagline", event.target.value)} className={fieldClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Biography *
              <textarea required rows={4} value={draft.bio} onChange={(event) => setField("bio", event.target.value)} className={fieldClass} />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
              Artist story (separate paragraphs with a blank line)
              <textarea rows={5} value={draft.story} onChange={(event) => setField("story", event.target.value)} className={fieldClass} />
            </label>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold uppercase">Location and bookings</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className={labelClass}>City *<input required value={draft.city} onChange={(event) => setField("city", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>State *<input required value={draft.state} onChange={(event) => setField("state", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Region *<input required value={draft.region} onChange={(event) => setField("region", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Price *<input required value={draft.price} onChange={(event) => setField("price", event.target.value)} placeholder="From ₹12,000" className={fieldClass} /></label>
            <label className={labelClass}>Price details<input value={draft.priceNote} onChange={(event) => setField("priceNote", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Availability note<input value={draft.availabilityNote} onChange={(event) => setField("availabilityNote", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Available days this month<input value={draft.availableDays} onChange={(event) => setField("availableDays", event.target.value)} placeholder="3, 7, 14" className={fieldClass} /></label>
            <label className={labelClass}>Available for<input value={draft.availableFor} onChange={(event) => setField("availableFor", event.target.value)} placeholder="Festivals, Weddings" className={fieldClass} /></label>
            <label className={labelClass}>Performance formats<input value={draft.formats} onChange={(event) => setField("formats", event.target.value)} placeholder="Solo, Ensemble" className={fieldClass} /></label>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold uppercase">Experience and media</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className={labelClass}>Experience (years)<input type="number" min="0" value={draft.experienceYears} onChange={(event) => setField("experienceYears", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Rating<input type="number" min="0" max="5" step="0.1" value={draft.rating} onChange={(event) => setField("rating", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Review count<input type="number" min="0" value={draft.reviewCount} onChange={(event) => setField("reviewCount", event.target.value)} className={fieldClass} /></label>
            <label className={labelClass}>Languages<input value={draft.languages} onChange={(event) => setField("languages", event.target.value)} placeholder="Hindi, English" className={fieldClass} /></label>
            <label className={`${labelClass} sm:col-span-2`}>Portfolio image URLs (one per line)<textarea rows={2} value={draft.portfolio} onChange={(event) => setField("portfolio", event.target.value)} className={fieldClass} /></label>
            <label className={`${labelClass} sm:col-span-3`}>
              Reviews (one per line: name | role | quote)
              <textarea rows={3} value={draft.reviews} onChange={(event) => setField("reviews", event.target.value)} placeholder="Sana Kapoor | Wedding client | A remarkable performance." className={fieldClass} />
            </label>
            <label className={`${labelClass} sm:col-span-3`}>Featured quote<textarea rows={2} value={draft.quote} onChange={(event) => setField("quote", event.target.value)} className={fieldClass} /></label>
          </div>
        </section>

        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5">
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={draft.available} onChange={(event) => setField("available", event.target.checked)} /> Available for bookings</label>
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={draft.featured} onChange={(event) => setField("featured", event.target.checked)} /> Feature on homepage</label>
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={draft.isPublished} onChange={(event) => setField("isPublished", event.target.checked)} /> Publish on Explore</label>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-terracotta disabled:cursor-wait disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden /> {pending ? "Saving profile…" : "Save artist profile"}
        </button>
      </form>
    </div>
  );
}

function AdminMessage({ children }: { children: string }) {
  return <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 text-center text-muted-foreground">{children}</div>;
}