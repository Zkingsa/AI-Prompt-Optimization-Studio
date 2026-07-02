"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CostByModel {
  model: string;
  costUsd: number;
}

export default function AnalyticsCostsPage() {
  const [data, setData] = useState<CostByModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/costs")
      .then((res) => res.json())
      .then((body) => setData(body.data?.byModel ?? []))
      .finally(() => setLoading(false));
  }, []);

  const total = data.reduce((sum, d) => sum + d.costUsd, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      <Link href="/analytics" className="text-sm text-[var(--accent)]">
        ← Back to analytics
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cost breakdown</h1>
        <span className="text-sm text-[var(--muted)]">Total: ${total.toFixed(2)}</span>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Loading…</p>
        ) : data.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No spend recorded yet.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="model" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="costUsd" fill="var(--accent)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}