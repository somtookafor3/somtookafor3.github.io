"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/types";
import { MaturityBadge, Tag, categoryLabel } from "./ui";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]/40"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">
          {categoryLabel[project.category]}
        </span>
        <MaturityBadge maturity={project.maturity} />
        <span className="ml-auto font-mono text-[11px] text-[var(--muted)]">
          {project.period}
        </span>
      </div>

      <h3 className="text-lg font-semibold tracking-tight">
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
          {project.name}
        </Link>
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {project.tagline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        {project.stack.length > 5 && (
          <span className="px-1 py-1 font-mono text-[11px] text-[var(--muted)]">
            +{project.stack.length - 5}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-[var(--border)] pt-4 text-[11px] text-[var(--muted)]">
        {project.metrics.linesOfCode && (
          <span className="font-mono">
            {project.metrics.linesOfCode.toLocaleString()} LOC
          </span>
        )}
        {typeof project.metrics.commits === "number" && project.metrics.commits > 0 && (
          <span className="font-mono">{project.metrics.commits} commits</span>
        )}
        <ArrowRight
          size={14}
          className="ml-auto text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
        />
      </div>
    </motion.article>
  );
}
