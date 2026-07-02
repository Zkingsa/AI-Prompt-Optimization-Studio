"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface OverviewPoint {
  date: string;
  runs: number;
  costUsd: number;
}

export default function AnalyticsOverviewPage() {
  const [points, setPoints] = useState<OverviewPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/overview")
      .then((res) => res.json())
      .then((body) => setPoints(body.data?.timeline ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Analytics</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/analytics/costs" className="text-[var(--accent)]">
            Cost breakdown →
          </Link>
          <Link href="/analytics/performance" className="text-[var(--accent)]">
            Performance →
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
        <h2 className="text-sm font-semibold">Runs over time</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[var(--muted)]">Loading chart…</p>
        ) : points.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">
            No runs yet — execute a prompt or test suite to see data here.
          </p>
        ) : (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={points}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="runs" stroke="var(--accent)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}