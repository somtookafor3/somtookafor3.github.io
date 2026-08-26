import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section } from "@/components/ui";
import { skills, skillCategories } from "@/data/skills";
import { architecturePatterns } from "@/data/stats";
import type { Skill } from "@/data/types";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frameworks and tools I've actually used, with a note on where I used each one.",
};

const levelWidth: Record<Skill["level"], string> = {
  advanced: "w-full",
  proficient: "w-3/4",
  working: "w-1/2",
  familiar: "w-1/4",
};

const levelLabel: Record<Skill["level"], string> = {
  advanced: "Advanced",
  proficient: "Proficient",
  working: "Working",
  familiar: "Familiar",
};

export default function SkillsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section
          title="Technical skills"
          subtitle="Every skill below is backed by code on my machine. Proficiency is estimated from how deeply and how often each technology was actually used — not from exposure alone."
          className="pt-16"
        >
          <div className="space-y-12">
            {skillCategories.map((category) => {
              const items = skills.filter((s) => s.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category}>
                  <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    {category}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {items.map((s) => (
                      <div
                        key={s.name}
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-sm font-medium">{s.name}</h3>
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                            {levelLabel[s.level]}
                          </span>
                        </div>
                        <div
                          className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--surface-raised)]"
                          role="img"
                          aria-label={`${s.name}: ${levelLabel[s.level]}`}
                        >
                          <div
                            className={`h-full rounded-full bg-[var(--accent)] ${levelWidth[s.level]}`}
                          />
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                          {s.evidence}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          title="Architecture patterns applied"
          subtitle="Patterns identified in the source across projects."
        >
          <div className="flex flex-wrap gap-2">
            {architecturePatterns.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]"
              >
                {p}
              </span>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
