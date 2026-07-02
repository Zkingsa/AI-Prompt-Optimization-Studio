"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { PromptVersionRecord } from "@/types/prompt";

export default function PromptVersionsPage() {
  const params = useParams<{ id: string }>();
  const [versions, setVersions] = useState<PromptVersionRecord[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch(`/api/prompts/${params.id}/versions`)
      .then((res) => res.json())
      .then((body) => {
        if (!active) return;
        const data: PromptVersionRecord[] = body.data ?? [];
        setVersions(data);
        setSelected(data[0]?.id ?? null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params.id]);

  const current = versions.find((v) => v.id === selected);

  return (
    <div className="flex h-full">
      <div className="w-64 border-r border-[var(--border)] p-4">
        <Link href={`/prompts/${params.id}`} className="text-sm text-[var(--accent)]">
          ← Back to editor
        </Link>
        <h1 className="mt-4 text-sm font-semibold">Version history</h1>
        {loading ? (
          <p className="mt-3 text-sm text-[var(--muted)]">Loading…</p>
        ) : versions.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--muted)]">No saved versions yet.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-1">
            {versions.map((v) => (
              <li key={v.id}>
                <button
                  onClick={() => setSelected(v.id)}
                  className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${
                    selected === v.id ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "hover:bg-black/5"
                  }`}
                >
                  {new Date(v.createdAt).toLocaleString()}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 p-6">
        {current ? (
          <pre className="whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--card)] p-4 text-sm">
            {current.content}
          </pre>
        ) : (
          <p className="text-sm text-[var(--muted)]">Select a version to view its content.</p>
        )}
      </div>
    </div>
  );
}