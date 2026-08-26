import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/ui";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects I've built: crypto arbitrage tooling, backend APIs, parallel data processing, automation scripts, security coursework and a mobile app.",
};

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => a.rank - b.rank);

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section
          title="Projects"
          subtitle="University coursework through to what I'm working on now. I've said how far each one got, because a few are prototypes I never took further and it's better you hear that from me."
          className="pt-16"
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-[var(--muted)]">
            Work excluded on principle: IDE templates with no original code,
            third-party projects downloaded rather than written, repositories
            authored entirely by lecturers or code generators, and anything I
            could not verify as my own. Where I contributed to a shared codebase,
            the project page says so explicitly.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
