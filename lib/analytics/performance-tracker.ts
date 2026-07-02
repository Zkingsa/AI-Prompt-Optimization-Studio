import type { TestCaseResult } from "@/types/test";

export function averageLatency(results: TestCaseResult[]): number {
  if (results.length === 0) return 0;
  return Math.round(results.reduce((sum, r) => sum + r.latencyMs, 0) / results.length);
}

export function qualityScore(results: TestCaseResult[]): number {
  const scored = results.filter((r) => typeof r.score === "number");
  if (scored.length === 0) return 0;
  const avg = scored.reduce((sum, r) => sum + (r.score ?? 0), 0) / scored.length;
  return Math.round(avg * 100);
}
