import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const updateSchema = z.object({ name: z.string().min(1).optional() });

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const suite = await prisma.testSuite.findUnique({
      where: { id: params.id },
      include: { testCases: true },
    });
    if (!suite) return NextResponse.json({ error: "Test suite not found." }, { status: 404 });
    return NextResponse.json({ data: suite });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load test suite." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const parsed = updateSchema.parse(body);
    const suite = await prisma.testSuite.update({ where: { id: params.id }, data: parsed });
    return NextResponse.json({ data: suite });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not update test suite." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.testSuite.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete test suite." }, { status: 500 });
  }
}