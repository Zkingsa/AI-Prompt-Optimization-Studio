import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const updateSchema = z.object({
  input: z.record(z.string()).optional(),
  expected: z.string().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string; caseId: string } }
) {
  try {
    const body = await request.json();
    const parsed = updateSchema.parse(body);
    const testCase = await prisma.testCase.update({ where: { id: params.caseId }, data: parsed });
    return NextResponse.json({ data: testCase });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not update test case." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; caseId: string } }
) {
  try {
    await prisma.testCase.delete({ where: { id: params.caseId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete test case." }, { status: 500 });
  }
}