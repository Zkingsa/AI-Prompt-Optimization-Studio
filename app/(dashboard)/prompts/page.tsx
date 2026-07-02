"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Prompt } from "@/types/prompt";

export default function PromptsListPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/prompts")
      .then((res) => res.json())
      .then((body) => {
        if (active) setPrompts(body.data ?? []);
      })
      .catch(() => {
        if (active) setPrompts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = prompts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Prompts</h1>
        <Link
          href="/prompts/new"
          className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)] hover:opacity-90"
        >
          New prompt
        </Link>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search prompts…"
        className="w-full max-w-sm rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading prompts…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
          <p className="text-sm font-medium">No prompts yet</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Create your first prompt to start testing it across models.
          </p>
          <Link
            href="/prompts/new"
            className="mt-4 inline-block rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-[var(--accent-foreground)]"
          >
            New prompt
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/prompts/${p.id}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--accent)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{p.title}</h3>
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-[var(--muted)]">
                  {p.model}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">
                {p.content}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}