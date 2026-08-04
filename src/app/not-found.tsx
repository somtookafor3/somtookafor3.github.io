import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
        The page you&apos;re looking for may have been moved or renamed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[#04121d] transition-colors hover:bg-[var(--accent)]/90"
      >
        Back to home
      </Link>
    </main>
  );
}
