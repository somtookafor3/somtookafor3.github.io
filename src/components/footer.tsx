import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[var(--foreground)]">{profile.name}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Every project here is generated from evidence in my own codebase.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <Mail size={18} />
          </a>
          <Link
            href="/contact"
            className="text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
