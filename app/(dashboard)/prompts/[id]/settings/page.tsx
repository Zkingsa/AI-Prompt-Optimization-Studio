"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Prompt } from "@/types/prompt";

export default function PromptSettingsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/prompts/${params.id}`)
      .then((res) => res.json())
      .then((body) => {
        setPrompt(body.data ?? null);
        setTitle(body.data?.title ?? "");
      });
  }, [params.id]);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/prompts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prompt, title }),
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this prompt? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await fetch(`/api/prompts/${params.id}`, { method: "DELETE" });
      router.push("/prompts");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <Link href={`/prompts/${params.id}`} className="text-sm text-[var(--accent)]">
        ← Back to editor
      </Link>
      <h1 className="mt-4 text-xl font-semibold">Prompt settings</h1>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="mt-10 rounded-lg border border-[var(--danger)]/30 p-4">
        <h2 className="text-sm font-semibold text-[var(--danger)]">Danger zone</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Deleting a prompt also removes its saved versions and test results.
        </p>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="mt-3 rounded-md border border-[var(--danger)] px-3 py-2 text-sm font-medium text-[var(--danger)] disabled:opacity-60"
        >
          {deleting ? "Deleting…" : "Delete prompt"}
        </button>
      </div>
    </div>
  );
}