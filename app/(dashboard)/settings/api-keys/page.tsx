"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

interface ApiKey {
  id: string;
  provider: string;
  label: string;
  createdAt: string;
}

export default function ApiKeysSettingsPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [provider, setProvider] = useState("openai");
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/api-keys")
      .then((res) => res.json())
      .then((body) => setKeys(body.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, label, value }),
    });
    const body = await res.json();
    setKeys((prev) => [...prev, body.data]);
    setLabel("");
    setValue("");
  }

  async function handleRemove(id: string) {
    await fetch(`/api/api-keys/${id}`, { method: "DELETE" });
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="mt-4 flex gap-4 text-sm">
        <Link href="/settings" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          General
        </Link>
        <span className="font-medium text-[var(--accent)]">API keys</span>
        <Link href="/settings/team" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          Team
        </Link>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--card)]">
        {loading ? (
          <p className="p-4 text-sm text-[var(--muted)]">Loading…</p>
        ) : keys.length === 0 ? (
          <p className="p-4 text-sm text-[var(--muted)]">
            No API keys saved yet. Keys are encrypted at rest.
          </p>
        ) : (
          <ul>
            {keys.map((k) => (
              <li
                key={k.id}
                className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{k.label}</p>
                  <p className="text-xs text-[var(--muted)]">{k.provider}</p>
                </div>
                <button
                  onClick={() => handleRemove(k.id)}
                  className="text-xs text-[var(--danger)] hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold">Add a key</h2>
        <div className="flex gap-3">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="google">Google AI</option>
          </select>
          <input
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (e.g. Production)"
            className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
        <input
          required
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="API key"
          className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <div>
          <button
            type="submit"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)]"
          >
            Save key
          </button>
        </div>
      </form>
    </div>
  );
}
