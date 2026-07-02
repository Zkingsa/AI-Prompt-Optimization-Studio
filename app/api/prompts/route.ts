import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const createSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  model: z.string().default("gpt-4o"),
  description: z.string().optional(),
});

export async function GET() {
  try {
    const prompts = await prisma.prompt.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json({ data: prompts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load prompts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.parse(body);
    const prompt = await prisma.prompt.create({
      data: {
        title: parsed.title,
        content: parsed.content,
        model: parsed.model,
        description: parsed.description,
        versions: { create: { content: parsed.content } },
      },
    });
    return NextResponse.json({ data: prompt }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not create prompt." }, { status: 500 });
  }
}