import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const createSchema = z.object({
  input: z.record(z.string()),
  expected: z.string().optional(),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const cases = await prisma.testCase.findMany({ where: { testSuiteId: params.id } });
    return NextResponse.json({ data: cases });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load test cases." }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { input, expected } = createSchema.parse(body);
    const testCase = await prisma.testCase.create({
      data: { testSuiteId: params.id, input, expected },
    });
    return NextResponse.json({ data: testCase }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not create test case." }, { status: 500 });
  }
}