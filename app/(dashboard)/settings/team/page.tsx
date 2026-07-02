"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

interface Member {
  email: string;
  role: "owner" | "editor" | "viewer";
}

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<Member[]>([
    { email: "you@company.com", role: "owner" },
  ]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Member["role"]>("editor");

  function invite(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setMembers((prev) => [...prev, { email, role }]);
    setEmail("");
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="mt-4 flex gap-4 text-sm">
        <Link href="/settings" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          General
        </Link>
        <Link href="/settings/api-keys" className="text-[var(--muted)] hover:text-[var(--foreground)]">
          API keys
        </Link>
        <span className="font-medium text-[var(--accent)]">Team</span>
      </div>

      <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--card)]">
        <ul>
          {members.map((m) => (
            <li
              key={m.email}
              className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 last:border-0"
            >
              <span className="text-sm">{m.email}</span>
              <span className="text-xs capitalize text-[var(--muted)]">{m.role}</span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={invite} className="mt-6 flex gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teammate@company.com"
          className="flex-1 rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Member["role"])}
          className="rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <button
          type="submit"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)]"
        >
          Invite
        </button>
      </form>
    </div>
  );
}
