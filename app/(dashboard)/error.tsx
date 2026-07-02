"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
      <p className="text-sm font-medium">Something went wrong.</p>
      <p className="max-w-sm text-sm text-[var(--muted)]">{error.message}</p>
      <button
        onClick={reset}
        className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-black/5"
      >
        Try again
      </button>
    </div>
  );
}