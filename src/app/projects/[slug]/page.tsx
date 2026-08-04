import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  Card,
  CodeBlock,
  MaturityBadge,
  Tag,
  categoryLabel,
} from "@/components/ui";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.name, description: project.tagline };
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pb-10 pt-14">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} /> All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">
              {categoryLabel[project.category]}
            </span>
            <MaturityBadge maturity={project.maturity} />
            <span className="font-mono text-[11px] text-[var(--muted)]">
              {project.period}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
            {project.tagline}
          </p>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--foreground)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                >
                  {l.label} <ExternalLink size={12} />
                </a>
              ))}
            </div>
          )}

          {/* Metrics */}
          {(project.metrics.linesOfCode ||
            project.metrics.files ||
            typeof project.metrics.commits === "number") && (
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
              {project.metrics.linesOfCode && (
                <div className="bg-[var(--surface)] p-4">
                  <dd className="font-mono text-lg font-semibold text-[var(--accent)]">
                    {project.metrics.linesOfCode.toLocaleString()}
                  </dd>
                  <dt className="mt-1 text-[11px] text-[var(--muted)]">Lines of code</dt>
                </div>
              )}
              {project.metrics.files && (
                <div className="bg-[var(--surface)] p-4">
                  <dd className="font-mono text-lg font-semibold text-[var(--accent)]">
                    {project.metrics.files}
                  </dd>
                  <dt className="mt-1 text-[11px] text-[var(--muted)]">Files</dt>
                </div>
              )}
              {typeof project.metrics.commits === "number" && (
                <div className="bg-[var(--surface)] p-4">
                  <dd className="font-mono text-lg font-semibold text-[var(--accent)]">
                    {project.metrics.commits}
                  </dd>
                  <dt className="mt-1 text-[11px] text-[var(--muted)]">Commits</dt>
                </div>
              )}
            </dl>
          )}

          <Block title="Overview">
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {project.overview}
            </p>
          </Block>

          <Block title="Technology stack">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </Block>

          <Block title="Architecture">
            <List items={project.architecture} />
          </Block>

          <Block title="Engineering highlights">
            <List items={project.highlights} />
          </Block>

          {project.challenges.length > 0 && (
            <Block title="Challenges & solutions">
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <Card key={i}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--warning)]">
                      Problem
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {c.problem}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--success)]">
                      Solution
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {c.solution}
                    </p>
                  </Card>
                ))}
              </div>
            </Block>
          )}

          {project.snippets.length > 0 && (
            <Block title="Code">
              <div className="space-y-8">
                {project.snippets.map((s, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold">{s.title}</h3>
                    <p className="mb-3 mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {s.explanation}
                    </p>
                    <CodeBlock code={s.code} language={s.language} />
                  </div>
                ))}
              </div>
            </Block>
          )}

          <Block title="Lessons learned">
            <List items={project.lessons} />
          </Block>

          <Block title="Future improvements">
            <List items={project.futureImprovements} />
          </Block>
        </article>
      </main>
      <Footer />
    </>
  );
}
