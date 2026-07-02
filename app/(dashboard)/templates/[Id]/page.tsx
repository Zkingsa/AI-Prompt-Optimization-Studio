"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
}

export default function TemplateDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [using, setUsing] = useState(false);

  useEffect(() => {
    fetch(`/api/templates/${params.id}`)
      .then((res) => res.json())
      .then((body) => setTemplate(body.data ?? null))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function useTemplate() {
    if (!template) return;
    setUsing(true);
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: template.title,
          content: template.content,
          model: "gpt-4o",
        }),
      });
      const body = await res.json();
      router.push(`/prompts/${body.data.id}`);
    } finally {
      setUsing(false);
    }
  }

  if (loading) return <p className="p-6 text-sm text-[var(--muted)]">Loading…</p>;
  if (!template) return <p className="p-6 text-sm">Template not found.</p>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link href="/templates" className="text-sm text-[var(--accent)]">
        ← Back to templates
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{template.title}</h1>
        <button
          onClick={useTemplate}
          disabled={using}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] disabled:opacity-60"
        >
          {using ? "Creating…" : "Use this template"}
        </button>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{template.description}</p>
      <pre className="mt-6 whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--card)] p-4 text-sm">
        {template.content}
      </pre>
    </div>
  );
}
