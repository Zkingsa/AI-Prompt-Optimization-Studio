import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="text-2xl font-semibold">404</p>
      <p className="text-sm text-[var(--muted)]">This page doesn't exist.</p>
      <Link href="/" className="text-sm text-[var(--accent)]">
        Back to the dashboard
      </Link>
    </div>
  );
}