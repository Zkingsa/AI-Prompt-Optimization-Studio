"use client";

import Link from "next/link";
import { useState } from "react";

export default function GeneralSettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="mt-4 flex gap-4 text-sm">
        <span className="font-medium text-[var(--accent)]">General</span>
        <Link href="/settings/api-keys" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          API keys
        </Link>
        <Link href="/settings/team" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          Team
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="mt-6 flex flex-col gap-4"
      >
        <label className="flex flex-col gap-1.5 text-sm">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </label>
        <div>
          <button
            type="submit"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)]"
          >
            Save changes
          </button>
          {saved && <span className="ml-3 text-sm text-[var(--success)]">Saved.</span>}
        </div>
      </form>
    </div>
  );
}
