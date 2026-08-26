import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, Card } from "@/components/ui";
import { LanguageChart, CategoryChart, ScoreRadar, ScoreLegend } from "@/components/charts";
import { testingCoverage, headlineStats } from "@/data/stats";
import { timeline } from "@/data/skills";

export const metadata: Metadata = {
  title: "Technical Dashboard",
  description:
    "Quantitative breakdown of the codebase: language distribution, project categories, testing coverage, and a technical timeline.",
};

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section
          title="Technical dashboard"
          subtitle="A breakdown of what I've written and where the time went. Line counts leave out dependencies, virtual environments and build output, so these are files I wrote myself."
          className="pt-16"
        >
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4">
            {headlineStats.map((s) => (
              <div key={s.label} className="bg-[var(--surface)] p-5">
                <dd className="font-mono text-2xl font-semibold text-[var(--accent)]">
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs font-medium">{s.label}</dt>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
                  {s.detail}
                </p>
              </div>
            ))}
          </dl>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Card>
              <h2 className="text-base font-semibold">Language distribution</h2>
              <p className="mb-4 mt-1 text-xs text-[var(--muted)]">
                Lines of code by language across the projects listed here.
              </p>
              <LanguageChart />
            </Card>

            <Card>
              <h2 className="text-base font-semibold">Code by project category</h2>
              <p className="mb-4 mt-1 text-xs text-[var(--muted)]">
                Which kinds of projects took up the most time.
              </p>
              <CategoryChart />
            </Card>
          </div>

          <Card className="mt-5">
            <h2 className="text-base font-semibold">Project scoring</h2>
            <p className="mb-4 mt-1 text-xs text-[var(--muted)]">
              My top three projects across five dimensions (0–10). The testing
              axis is uneven for a reason: the Python engine has 228 tests and
              the TypeScript terminal has none, which is something I need to fix.
            </p>
            <ScoreRadar />
            <ScoreLegend />
          </Card>

          <Card className="mt-5">
            <h2 className="text-base font-semibold">Testing coverage by project</h2>
            <p className="mb-5 mt-1 text-xs text-[var(--muted)]">
              Testing is bimodal across the portfolio — a gap I&apos;m actively closing.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[11px] uppercase tracking-wider text-[var(--muted)]">
                    <th scope="col" className="pb-3 font-medium">Project</th>
                    <th scope="col" className="pb-3 text-right font-medium">Tests</th>
                    <th scope="col" className="pb-3 text-right font-medium">Files</th>
                    <th scope="col" className="pb-3 text-right font-medium">Test LOC</th>
                  </tr>
                </thead>
                <tbody>
                  {testingCoverage.map((t) => (
                    <tr key={t.project} className="border-b border-[var(--border)]/50">
                      <td className="py-3 text-[var(--foreground)]">{t.project}</td>
                      <td className={`py-3 text-right font-mono ${t.tests > 0 ? "text-[var(--success)]" : "text-[var(--warning)]"}`}>
                        {t.tests}
                      </td>
                      <td className="py-3 text-right font-mono text-[var(--muted)]">{t.files}</td>
                      <td className="py-3 text-right font-mono text-[var(--muted)]">
                        {t.lines.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Section>

        <Section title="Technical timeline" subtitle="Three years, from first tutorial to distributed systems.">
          <ol className="relative border-l border-[var(--border)] pl-6">
            {timeline.map((e, i) => (
              <li key={i} className="mb-8 last:mb-0">
                <span
                  className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                  aria-hidden
                />
                <time className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">
                  {e.date}
                </time>
                <h3 className="mt-1 text-sm font-medium">{e.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                  {e.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </main>
      <Footer />
    </>
  );
}
