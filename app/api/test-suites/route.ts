import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const createSchema = z.object({
  name: z.string().min(1),
  promptId: z.string().min(1),
});

export async function GET() {
  try {
    const suites = await prisma.testSuite.findMany({
      include: { testCases: true },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ data: suites });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load test suites." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, promptId } = createSchema.parse(body);
    const suite = await prisma.testSuite.create({
      data: { name, promptId },
      include: { testCases: true },
    });
    return NextResponse.json({ data: suite }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not create test suite." }, { status: 500 });
  }
}