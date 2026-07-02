"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TestSuite } from "@/types/test";

export default function TestSuitesListPage() {
  const [suites, setSuites] = useState<TestSuite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test-suites")
      .then((res) => res.json())
      .then((body) => setSuites(body.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Test suites</h1>
        <Link
          href="/test-suites/new"
          className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
        >
          New test suite
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading test suites…</p>
      ) : suites.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
          <p className="text-sm font-medium">No test suites yet</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Group test cases together so you can run them against a prompt in one go.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suites.map((s) => (
            <Link
              key={s.id}
              href={`/test-suites/${s.id}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--accent)]"
            >
              <h3 className="text-sm font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {s.testCases?.length ?? 0} test case{(s.testCases?.length ?? 0) === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
