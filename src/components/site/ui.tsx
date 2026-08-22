import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/** Small shared form primitives styled from design tokens. */

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-input bg-cream px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-input bg-cream px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none ${props.className ?? ""}`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-input bg-cream px-4 py-3 text-sm focus:border-primary focus:outline-none ${props.className ?? ""}`}
    />
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-transparent text-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export function StatBlock({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center">
      <p className="font-display text-5xl font-bold tracking-tight text-primary sm:text-6xl">
        {value}
        {suffix && <span className="text-brick">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
