"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { TestCase, TestSuite } from "@/types/test";

export default function TestSuiteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [suite, setSuite] = useState<TestSuite | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [newInput, setNewInput] = useState("");
  const [newExpected, setNewExpected] = useState("");

  useEffect(() => {
    fetch(`/api/test-suites/${params.id}`)
      .then((res) => res.json())
      .then((body) => setSuite(body.data ?? null))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function addTestCase() {
    if (!newInput.trim()) return;
    const res = await fetch(`/api/test-suites/${params.id}/test-cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: { input: newInput }, expected: newExpected || undefined }),
    });
    const body = await res.json();
    const created: TestCase = body.data;
    setSuite((prev) => (prev ? { ...prev, testCases: [...prev.testCases, created] } : prev));
    setNewInput("");
    setNewExpected("");
  }

  async function removeTestCase(caseId: string) {
    await fetch(`/api/test-suites/${params.id}/test-cases/${caseId}`, { method: "DELETE" });
    setSuite((prev) =>
      prev ? { ...prev, testCases: prev.testCases.filter((c) => c.id !== caseId) } : prev
    );
  }

  async function runSuite() {
    setRunning(true);
    try {
      await fetch(`/api/test-suites/${params.id}/run`, { method: "POST" });
      router.push(`/test-suites/${params.id}/results`);
    } finally {
      setRunning(false);
    }
  }

  if (loading) return <p className="p-6 text-sm text-[var(--muted)]">Loading…</p>;
  if (!suite) return <p className="p-6 text-sm">Test suite not found.</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{suite.name}</h1>
          <Link href={`/test-suites/${suite.id}/results`} className="text-sm text-[var(--accent)]">
            View latest results →
          </Link>
        </div>
        <button
          onClick={runSuite}
          disabled={running || suite.testCases.length === 0}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
        >
          {running ? "Running…" : "Run suite"}
        </button>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
              <th className="px-4 py-2">Input</th>
              <th className="px-4 py-2">Expected</th>
              <th className="px-4 py-2 w-16" />
            </tr>
          </thead>
          <tbody>
            {suite.testCases.map((c) => (
              <tr key={c.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-2">{Object.values(c.input).join(", ")}</td>
                <td className="px-4 py-2 text-[var(--muted)]">{c.expected ?? "—"}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => removeTestCase(c.id)}
                    className="text-xs text-[var(--danger)] hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {suite.testCases.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-[var(--muted)]">
                  No test cases yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-[var(--border)] p-4">
        <label className="flex flex-1 flex-col gap-1.5 text-sm">
          Input
          <input
            value={newInput}
            onChange={(e) => setNewInput(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <label className="flex flex-1 flex-col gap-1.5 text-sm">
          Expected output (optional)
          <input
            value={newExpected}
            onChange={(e) => setNewExpected(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <button
          onClick={addTestCase}
          className="rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium hover:bg-black/5"
        >
          Add case
        </button>
      </div>
    </div>
  );
}
