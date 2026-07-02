"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { Prompt, PromptExecutionResult } from "@/types/prompt";

function extractVariables(content: string): string[] {
  const matches = content.matchAll(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g);
  return Array.from(new Set(Array.from(matches, (m) => m[1])));
}

export default function PromptEditorPage() {
  const params = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<PromptExecutionResult | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [runError, setRunError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/prompts/${params.id}`)
      .then((res) => res.json())
      .then((body) => {
        if (!active) return;
        setPrompt(body.data ?? null);
        setContent(body.data?.content ?? "");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params.id]);

  const variables = useMemo(() => extractVariables(content), [content]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/prompts/${params.id}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleRun() {
    setRunning(true);
    setRunError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/prompts/${params.id}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, variables: variableValues }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Run failed.");
      setResult(body.data);
    } catch (err) {
      setRunError(err instanceof Error ? err.message : "Run failed.");
    } finally {
      setRunning(false);
    }
  }

  if (loading) {
    return <p className="p-6 text-sm text-[var(--muted)]">Loading prompt…</p>;
  }

  if (!prompt) {
    return (
      <div className="p-6">
        <p className="text-sm">Prompt not found.</p>
        <Link href="/prompts" className="text-sm text-[var(--accent)]">
          Back to prompts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">{prompt.title}</h1>
          <div className="mt-1 flex gap-3 text-sm text-[var(--muted)]">
            <Link href={`/prompts/${prompt.id}/versions`} className="hover:text-[var(--foreground)]">
              Version history
            </Link>
            <Link href={`/prompts/${prompt.id}/settings`} className="hover:text-[var(--foreground)]">
              Settings
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium hover:bg-black/5 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save version"}
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {running ? "Running…" : "Run"}
          </button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-0 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4 border-r border-[var(--border)] p-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="flex-1 rounded-md border border-[var(--border)] bg-[var(--card)] p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />

          <div>
            <h2 className="text-sm font-semibold">Output</h2>
            {runError && <p className="mt-2 text-sm text-[var(--danger)]">{runError}</p>}
            {!result && !runError && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                Run the prompt to see a response here.
              </p>
            )}
            {result && (
              <div className="mt-2 rounded-md border border-[var(--border)] bg-[var(--card)] p-3">
                <pre className="whitespace-pre-wrap text-sm">{result.output}</pre>
                <div className="mt-3 flex gap-4 text-xs text-[var(--muted)]">
                  <span>{result.latencyMs} ms</span>
                  <span>{result.tokensIn + result.tokensOut} tokens</span>
                  <span>${result.costUsd.toFixed(4)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <h2 className="text-sm font-semibold">Variables</h2>
          {variables.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              No variables detected. Use <code>{"{{name}}"}</code> in the prompt to add one.
            </p>
          ) : (
            variables.map((v) => (
              <label key={v} className="flex flex-col gap-1.5 text-sm">
                {v}
                <input
                  value={variableValues[v] ?? ""}
                  onChange={(e) =>
                    setVariableValues((prev) => ({ ...prev, [v]: e.target.value }))
                  }
                  className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
