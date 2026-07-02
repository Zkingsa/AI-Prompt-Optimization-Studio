import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  model: z.string().optional(),
  description: z.string().optional(),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const prompt = await prisma.prompt.findUnique({ where: { id: params.id } });
    if (!prompt) return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
    return NextResponse.json({ data: prompt });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load prompt." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const parsed = updateSchema.parse(body);
    const prompt = await prisma.prompt.update({ where: { id: params.id }, data: parsed });
    return NextResponse.json({ data: prompt });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not update prompt." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.prompt.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete prompt." }, { status: 500 });
  }
}
