"use client";

import { useState } from "react";

const MODELS = [
  { id: "gpt-4o", label: "OpenAI · GPT-4o" },
  { id: "claude-sonnet-4-6", label: "Anthropic · Claude Sonnet 4.6" },
  { id: "gemini-1.5-pro", label: "Google · Gemini 1.5 Pro" },
];

export default function PlaygroundPage() {
  const [model, setModel] = useState(MODELS[0].id);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setRunning(true);
    setError(null);
    setOutput("");
    try {
      const res = await fetch("/api/prompts/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, content: prompt, variables: {} }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Run failed.");
      setOutput(body.data?.output ?? JSON.stringify(body.data));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Playground</h1>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a one-off prompt to try…"
            rows={14}
            className="flex-1 rounded-md border border-[var(--border)] bg-[var(--card)] p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button
            onClick={handleRun}
            disabled={running || !prompt.trim()}
            className="self-end rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {running ? "Running…" : "Run"}
          </button>
        </div>

        <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3">
          {error ? (
            <p className="text-sm text-[var(--danger)]">{error}</p>
          ) : output ? (
            <pre className="whitespace-pre-wrap text-sm">{output}</pre>
          ) : (
            <p className="text-sm text-[var(--muted)]">Output will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}