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
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PerformancePoint {
  date: string;
  latencyMs: number;
  qualityScore: number;
}

export default function AnalyticsPerformancePage() {
  const [data, setData] = useState<PerformancePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/performance")
      .then((res) => res.json())
      .then((body) => setData(body.data?.timeline ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <Link href="/analytics" className="text-sm text-[var(--accent)]">
        ← Back to analytics
      </Link>
      <h1 className="text-xl font-semibold">Performance</h1>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
        <h2 className="text-sm font-semibold">Latency & quality over time</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[var(--muted)]">Loading…</p>
        ) : data.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">No performance data yet.</p>
        ) : (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="latencyMs" name="Latency (ms)" stroke="var(--warning)" dot={false} />
                <Line type="monotone" dataKey="qualityScore" name="Quality score" stroke="var(--success)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}