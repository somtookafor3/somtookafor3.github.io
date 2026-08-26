import Link from "next/link";
import { ArrowRight, Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { Section, Card, ButtonLink } from "@/components/ui";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { headlineStats } from "@/data/stats";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-24 sm:pt-32">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {profile.location}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              Somtochukwu{" "}
              <span className="text-[var(--muted)]">Okafor</span>
              <span className="block text-[var(--accent)]">{profile.title}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {profile.tagline}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/projects">
                View projects <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href={profile.cvFile} download="Somto-Okafor-CV.pdf">
                <FileText size={16} /> Download CV
              </ButtonLink>
              <ButtonLink href={profile.github} variant="ghost" external>
                <GithubIcon size={16} /> GitHub
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                <Mail size={16} /> Contact
              </ButtonLink>
            </div>

            {/* Headline stats */}
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4">
              {headlineStats.map((s) => (
                <div key={s.label} className="bg-[var(--surface)] p-5">
                  <dd className="font-mono text-2xl font-semibold text-[var(--accent)]">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-xs font-medium text-[var(--foreground)]">
                    {s.label}
                  </dt>
                  <p className="mt-1 text-[11px] leading-relaxed text-[var(--muted)]">
                    {s.detail}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Featured projects */}
        <Section
          title="Selected work"
          subtitle="Roughly in order of how much engineering went into them. I've marked how far each one actually got, since a few are prototypes rather than finished products."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
            >
              All projects <ArrowRight size={14} />
            </Link>
          </div>
        </Section>

        {/* How I work */}
        <Section
          title="How I work"
          subtitle="Habits that come up again and again in the code."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {profile.howIWork.map((p) => (
              <Card key={p.title}>
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {p.body}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <Card className="flex flex-col items-start justify-between gap-6 bg-[var(--surface-raised)] sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Looking for a graduate software engineer
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                Open to backend, full-stack, AI/ML, and quantitative developer roles.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">
                <Mail size={16} /> Get in touch
              </ButtonLink>
              <ButtonLink href="/about" variant="ghost">
                <FileText size={16} /> Background
              </ButtonLink>
            </div>
          </Card>
        </Section>
      </main>
      <Footer />
    </>
  );
}
