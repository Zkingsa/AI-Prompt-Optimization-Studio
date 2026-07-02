import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { runPrompt } from "@/lib/ai/prompt-engine";
import { scoreOutput } from "@/lib/optimization/scorer";
import type { TestCaseResult } from "@/types/test";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const suite = await prisma.testSuite.findUnique({
      where: { id: params.id },
      include: { testCases: true, prompt: true },
    });
    if (!suite) return NextResponse.json({ error: "Test suite not found." }, { status: 404 });

    const results: TestCaseResult[] = [];
    for (const testCase of suite.testCases) {
      const variables = testCase.input as Record<string, string>;
      const execResult = await runPrompt({
        model: suite.prompt.model,
        content: suite.prompt.content,
        variables,
      });
      const { passed, score } = scoreOutput(execResult.output, testCase.expected);
      results.push({
        testCaseId: testCase.id,
        output: execResult.output,
        passed,
        score,
        latencyMs: execResult.latencyMs,
      });
    }

    const run = await prisma.testRun.create({
      data: { testSuiteId: suite.id, results: results as unknown as object },
    });

    return NextResponse.json({ data: { ...run, results } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not run test suite." }, { status: 500 });
  }
}