"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((body) => setTemplates(body.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(templates.map((t) => t.category)))],
    [templates]
  );

  const filtered =
    category === "All" ? templates : templates.filter((t) => t.category === category);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-xl font-semibold">Templates</h1>

      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1 text-sm ${
              category === c
                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border border-[var(--border)] text-[var(--muted)] hover:bg-black/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading templates…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">No templates in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.id}
              href={`/templates/${t.id}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--accent)]"
            >
              <span className="text-xs text-[var(--muted)]">{t.category}</span>
              <h3 className="mt-1 text-sm font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{t.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
