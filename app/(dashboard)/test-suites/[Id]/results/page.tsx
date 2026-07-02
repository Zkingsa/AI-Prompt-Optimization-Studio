"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { TestRunResult } from "@/types/test";

export default function TestSuiteResultsPage() {
  const params = useParams<{ id: string }>();
  const [run, setRun] = useState<TestRunResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/test-suites/${params.id}/results`)
      .then((res) => res.json())
      .then((body) => setRun(body.data ?? null))
      .finally(() => setLoading(false));
  }, [params.id]);

  const passCount = run?.results.filter((r) => r.passed).length ?? 0;
  const total = run?.results.length ?? 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      <Link href={`/test-suites/${params.id}`} className="text-sm text-[var(--accent)]">
        ← Back to test suite
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Results</h1>
        {run && (
          <span className="text-sm text-[var(--muted)]">
            {passCount}/{total} passed · {new Date(run.createdAt).toLocaleString()}
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading results…</p>
      ) : !run || run.results.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
          <p className="text-sm font-medium">No results yet</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Run the test suite to see results here.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Output</th>
                <th className="px-4 py-2">Latency</th>
              </tr>
            </thead>
            <tbody>
              {run.results.map((r) => (
                <tr key={r.testCaseId} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        r.passed
                          ? "bg-green-100 text-[var(--success)]"
                          : r.passed === false
                          ? "bg-red-100 text-[var(--danger)]"
                          : "bg-black/5 text-[var(--muted)]"
                      }`}
                    >
                      {r.passed === null ? "Unscored" : r.passed ? "Pass" : "Fail"}
                    </span>
                  </td>
                  <td className="max-w-md truncate px-4 py-2">{r.output}</td>
                  <td className="px-4 py-2 text-[var(--muted)]">{r.latencyMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
