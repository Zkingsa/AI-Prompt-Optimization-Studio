import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { averageLatency, qualityScore } from "@/lib/analytics/performance-tracker";
import type { TestCaseResult } from "@/types/test";

export async function GET() {
  try {
    const runs = await prisma.testRun.findMany({ orderBy: { createdAt: "asc" } });

    const timeline = runs.map((run: { createdAt: Date; results: unknown }) => {
      const results = run.results as unknown as TestCaseResult[];
      return {
        date: run.createdAt.toISOString().slice(0, 10),
        latencyMs: averageLatency(results),
        qualityScore: qualityScore(results),
      };
    });

    return NextResponse.json({ data: { timeline } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load performance data." }, { status: 500 });
  }
}