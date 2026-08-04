"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--background)]/85 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
      >
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          somto<span className="text-[var(--accent)]">.</span>okafor
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-[var(--muted)] hover:text-[var(--foreground)] md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-[var(--border)] px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
