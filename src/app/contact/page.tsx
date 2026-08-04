import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section, Card } from "@/components/ui";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about graduate software engineering opportunities.",
};

export default function ContactPage() {
  const items = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com/somtookafor3",
      href: profile.github,
    },
    {
      icon: GithubIcon,
      label: "GitHub (coursework)",
      value: "github.com/okafors",
      href: profile.githubCoursework,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: null,
    },
  ];

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Section
          title="Contact"
          subtitle="Open to graduate and junior roles in backend engineering, full-stack development, AI/ML, and quantitative development."
          className="pt-16"
        >
          <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon size={18} className="text-[var(--accent)]" />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-1 break-words text-sm text-[var(--foreground)]">
                    {item.value}
                  </p>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]/50"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  {content}
                </div>
              );
            })}
          </div>

          <Card className="mt-8 max-w-3xl bg-[var(--surface-raised)]">
            <h2 className="text-base font-semibold">What I&apos;m looking for</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              A team where I can work on systems with real constraints — latency,
              correctness, money, or scale — and learn from engineers who are
              better than me. I&apos;m most useful on backend and data-intensive
              work, and I&apos;m happy to be the person who writes the tests and
              the guardrails.
            </p>
          </Card>
        </Section>
      </main>
      <Footer />
    </>
  );
}
