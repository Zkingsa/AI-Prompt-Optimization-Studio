"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import type { Prompt } from "@/types/prompt";

export default function NewTestSuitePage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [name, setName] = useState("");
  const [promptId, setPromptId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/prompts")
      .then((res) => res.json())
      .then((body) => {
        setPrompts(body.data ?? []);
        if (body.data?.[0]) setPromptId(body.data[0].id);
      });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/test-suites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, promptId, testCases: [] }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Could not create test suite.");
      router.push(`/test-suites/${body.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">New test suite</h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Support triage — regression suite"
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          Prompt
          {prompts.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Create a prompt first to attach a test suite to it.
            </p>
          ) : (
            <select
              value={promptId}
              onChange={(e) => setPromptId(e.target.value)}
              className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {prompts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}
        </label>

        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={saving || !promptId}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create test suite"}
          </button>
        </div>
      </form>
    </div>
  );
}