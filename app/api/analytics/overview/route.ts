import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { estimateCostForRuns } from "@/lib/analytics/cost-calculator";

export async function GET() {
  try {
    const [totalPrompts, activeTestSuites, totalRuns, runs] = await Promise.all([
      prisma.prompt.count(),
      prisma.testSuite.count(),
      prisma.testRun.count(),
      prisma.testRun.findMany({ orderBy: { createdAt: "asc" }, select: { createdAt: true } }),
    ]);

    const byDate = new Map<string, number>();
    for (const run of runs) {
      const day = run.createdAt.toISOString().slice(0, 10);
      byDate.set(day, (byDate.get(day) ?? 0) + 1);
    }
    const timeline = Array.from(byDate.entries()).map(([date, count]) => ({
      date,
      runs: count,
      costUsd: estimateCostForRuns(count),
    }));

    return NextResponse.json({
      data: {
        totalPrompts,
        activeTestSuites,
        totalRuns,
        estimatedCost: estimateCostForRuns(totalRuns),
        timeline,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load overview." }, { status: 500 });
  }
}