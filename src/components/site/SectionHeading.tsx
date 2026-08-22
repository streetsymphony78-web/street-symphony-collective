import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className = "" }: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="headline mt-3 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}
