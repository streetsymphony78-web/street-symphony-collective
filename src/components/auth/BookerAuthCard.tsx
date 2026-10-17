import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { signIn } from "@/lib/auth";
import { getSupabaseErrorMessage, saveBookerProfile, supabase } from "@/lib/supabase";

type BookerAuthCardProps = {
  mode: "login" | "signup";
};

function normalizeMobile(input: string) {
  const digits = input.replace(/\D/g, "");

  if (!digits) return "";
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length > 10 && !input.startsWith("+")) return `+${digits}`;
  return input.trim();
}

export function BookerAuthCard({ mode }: BookerAuthCardProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", mobile: "" });
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const normalizedMobile = useMemo(() => normalizeMobile(form.mobile), [form.mobile]);
  const isFormValid = form.name.trim().length >= 2 && normalizedMobile.length >= 10;

  const title = mode === "login" ? "Welcome back" : "Create your account";
  const eyebrow = mode === "login" ? "Booker login" : "First-time booker";
  const submitLabel = mode === "login" ? "Continue" : "Create account";
  const pendingLabel = mode === "login" ? "Sending OTP..." : "Creating account...";
  const alternativeText = mode === "login" ? "Need an account?" : "Already have an account?";
  const alternativeLinkTo = mode === "login" ? "/signup" : "/auth";
  const alternativeLinkLabel = mode === "login" ? "Create an account" : "Login";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!isFormValid) {
      setError("Please enter your full name and a valid mobile number.");
      return;
    }

    setStatus("pending");

    try {
      if (!supabase) {
        throw new Error("Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
      }

      const { error: supabaseError } = await supabase.auth.signInWithOtp({
        phone: normalizedMobile,
        options: {
          data: {
            full_name: form.name.trim(),
            role: "booker",
          },
        },
      });

      if (supabaseError) {
        throw supabaseError;
      }

      const { error: insertError } = await saveBookerProfile({
        name: form.name.trim(),
        phone: normalizedMobile,
      });

      if (insertError) {
        throw insertError;
      }

      signIn("booker", form.name.trim(), normalizedMobile);

      setStatus("success");
      setMessage(
        mode === "login"
          ? `OTP sent to ${normalizedMobile}. Please verify it on your phone, then continue to browse artists.`
          : `Your account is ready. We’ve sent a verification code to ${normalizedMobile}.`,
      );
      navigate({ to: "/explore" });
    } catch (submitError) {
      setError(getSupabaseErrorMessage(submitError));
      setStatus("idle");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full rounded-[28px] border border-border bg-background p-6 shadow-[0_18px_50px_-22px_rgba(42,33,29,0.24)] sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="eyebrow mb-2 text-center">{eyebrow}</p>
            <h1 className="headline text-center text-3xl sm:text-4xl">{title}</h1>
          </div>

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
              Full name
            </label>
            <input
              id={`name-${mode}`}
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
            <label htmlFor="mobile" className="mb-2 block text-sm font-semibold text-foreground">
              Mobile number (+91)
            </label>
            <input
              id={`mobile-${mode}`}
              name="mobile"
              type="tel"
              autoComplete="tel"
              value={form.mobile}
              onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))}
              placeholder="(+91)"
              className="w-full rounded-2xl border border-input bg-cream px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          {status === "success" && message ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4" aria-hidden />
              <span>{message}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "pending" || !isFormValid}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "pending" ? pendingLabel : submitLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {alternativeText}{" "}
            <Link to={alternativeLinkTo} className="font-semibold text-primary hover:text-terracotta">
              {alternativeLinkLabel}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
