"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const MODELS = [
  { id: "gpt-4o", label: "OpenAI · GPT-4o" },
  { id: "claude-sonnet-4-6", label: "Anthropic · Claude Sonnet 4.6" },
  { id: "gemini-1.5-pro", label: "Google · Gemini 1.5 Pro" },
];

export default function NewPromptPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [model, setModel] = useState(MODELS[0].id);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, model, content }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error ?? "Could not create prompt.");
      router.push(`/prompts/${body.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-semibold">New prompt</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Use <code>{"{{variable}}"}</code> syntax for anything you want to fill in at run time.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          Title
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Customer support triage"
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          Default model
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
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          Prompt content
          <textarea
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"You are a support triage assistant.\n\nTicket: {{ticket}}\n\nClassify the ticket and explain why."}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>

        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create prompt"}
          </button>
        </div>
      </form>
    </div>
  );
}
