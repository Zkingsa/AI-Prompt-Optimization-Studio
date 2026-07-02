import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { estimateCostForRuns } from "@/lib/analytics/cost-calculator";

export async function GET() {
  try {
    const suites = await prisma.testSuite.findMany({
      include: { prompt: { select: { model: true } }, _count: { select: { testRuns: true } } },
    });

    const byModel = new Map<string, number>();
    for (const suite of suites) {
      const model = suite.prompt.model;
      const cost = estimateCostForRuns(suite._count.testRuns, model);
      byModel.set(model, (byModel.get(model) ?? 0) + cost);
    }

    return NextResponse.json({
      data: {
        byModel: Array.from(byModel.entries()).map(([model, costUsd]) => ({ model, costUsd })),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load cost breakdown." }, { status: 500 });
  }
}
