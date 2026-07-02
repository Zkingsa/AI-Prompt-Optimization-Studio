import Link from "next/link";

async function getOverview() {
  // During local dev without a running DB this will fail gracefully —
  // the page falls back to zeroed stats rather than crashing.
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const res = await fetch(`${base}/api/analytics/overview`, { cache: "no-store" });
    if (!res.ok) throw new Error("failed");
    return res.json();
  } catch {
    return {
      data: { totalPrompts: 0, activeTestSuites: 0, totalRuns: 0, estimatedCost: 0 },
    };
  }
}

export default async function DashboardOverviewPage() {
  const { data } = await getOverview();

  const stats = [
    { label: "Prompts", value: data.totalPrompts ?? 0, href: "/prompts" },
    { label: "Active test suites", value: data.activeTestSuites ?? 0, href: "/test-suites" },
    { label: "Runs this month", value: data.totalRuns ?? 0, href: "/analytics" },
    {
      label: "Estimated spend",
      value: `$${(data.estimatedCost ?? 0).toFixed(2)}`,
      href: "/analytics/costs",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Overview</h1>
        <Link
          href="/prompts/new"
          className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
        >
          New prompt
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--accent)]"
          >
            <p className="text-xs text-[var(--muted)]">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-sm font-semibold">Get started</h2>
        <ol className="mt-3 flex flex-col gap-2 text-sm text-[var(--muted)]">
          <li>1. Create a prompt and define its variables.</li>
          <li>2. Build a test suite with a few representative cases.</li>
          <li>3. Run the suite, compare versions, and check the analytics.</li>
        </ol>
      </div>
    </div>
  );
}