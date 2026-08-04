import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Maturity, ProjectCategory } from "@/data/types";

export function Section({
  title,
  subtitle,
  children,
  className,
  id,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-5 py-16", className)}>
      {title && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]">
      {children}
    </span>
  );
}

const maturityStyles: Record<Maturity, string> = {
  production: "border-[var(--success)]/40 text-[var(--success)]",
  functional: "border-[var(--accent)]/40 text-[var(--accent)]",
  prototype: "border-[var(--warning)]/40 text-[var(--warning)]",
  coursework: "border-[var(--muted)]/40 text-[var(--muted)]",
};

const maturityLabel: Record<Maturity, string> = {
  production: "Production",
  functional: "Functional",
  prototype: "Advanced prototype",
  coursework: "Coursework",
};

export function MaturityBadge({ maturity }: { maturity: Maturity }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        maturityStyles[maturity],
      )}
    >
      {maturityLabel[maturity]}
    </span>
  );
}

export const categoryLabel: Record<ProjectCategory, string> = {
  "trading-systems": "Trading Systems",
  "full-stack": "Full-Stack",
  backend: "Backend",
  "ai-ml": "AI / ML",
  mobile: "Mobile",
  data: "Data & HPC",
  automation: "Automation",
  cybersecurity: "Cybersecurity",
};

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[#04070e]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-[var(--foreground)]">{code}</code>
      </pre>
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const className = cn(
    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
    variant === "primary"
      ? "bg-[var(--accent)] text-[#04121d] hover:bg-[var(--accent)]/90"
      : "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)]",
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
