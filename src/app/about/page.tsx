import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, Card } from "@/components/ui";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Computer Science graduate working across backend engineering, full-stack development, and applied AI.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section title="About" className="pt-16">
          <div className="max-w-3xl space-y-5">
            {profile.summary.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          <div className="space-y-5">
            {profile.experience.map((e) => (
              <Card key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">
                    {e.role}{" "}
                    <span className="text-[var(--accent)]">· {e.company}</span>
                  </h3>
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {e.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {e.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-5">
            {profile.education.map((e) => (
              <Card key={e.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">{e.qualification}</h3>
                  <span className="font-mono text-[11px] text-[var(--muted)]">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--accent)]">{e.institution}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {e.detail}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.certifications.map((c) => (
              <div
                key={c.name}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <h3 className="text-sm font-medium">{c.name}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {c.issuer} {c.year !== "—" && `· ${c.year}`}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
