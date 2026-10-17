import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { getSupabaseErrorMessage, saveArtistApplication } from "@/lib/supabase";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join as an Artist — Street Symphony" },
      {
        name: "description",
        content: "Apply to join Street Symphony as an artist and share your art form, name, and phone number.",
      },
      { property: "og:title", content: "Join as an Artist — Street Symphony" },
      {
        property: "og:description",
        content: "Tell us about your art, share your mobile number, and we’ll get in touch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArtistJoinPage,
});

function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (!digits) return "";
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length > 10 && !input.startsWith("+")) return `+${digits}`;
  return input.trim();
}

function ArtistJoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", description: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "pending">("idle");

  const normalizedPhone = useMemo(() => normalizePhone(form.phone), [form.phone]);
  const isFormValid = form.name.trim().length >= 2 && normalizedPhone.length >= 10;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please enter your name and a valid phone number.");
      return;
    }

    setStatus("pending");

    try {
      const { error: insertError } = await saveArtistApplication({
        name: form.name.trim(),
        phone: normalizedPhone,
        artDescription: form.description.trim(),
      });

      if (insertError) {
        throw insertError;
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(getSupabaseErrorMessage(submitError));
    } finally {
      setStatus("idle");
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full rounded-[28px] border border-border bg-background p-8 text-center shadow-[0_18px_50px_-22px_rgba(42,33,29,0.24)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </div>
          <h1 className="headline mt-6 text-3xl sm:text-4xl">We'll reach out to you soon</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Thanks for reaching out. We’ll be in touch with the next steps for your artist profile.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full rounded-[28px] border border-border bg-background p-6 shadow-[0_18px_50px_-22px_rgba(42,33,29,0.24)] sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="eyebrow mb-2 text-center">Join as an artist</p>
            <h1 className="headline text-center text-3xl sm:text-4xl">Tell us about your art</h1>
          </div>

          <div>
            <label htmlFor="artist-name" className="mb-2 block text-sm font-semibold text-foreground">
              Name
            </label>
            <input
              id="artist-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
              className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="artist-phone" className="mb-2 block text-sm font-semibold text-foreground">
              Phone number (+91)
            </label>
            <input
              id="artist-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              placeholder="(+91)"
              className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="artist-description" className="mb-2 block text-sm font-semibold text-foreground">
              Description of your art form <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea
              id="artist-description"
              name="description"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Tell us a little about your music, movement, craft, or performance style."
              rows={4}
              className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={status === "pending" || !isFormValid}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "pending" ? "Submitting..." : "Submit"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}
