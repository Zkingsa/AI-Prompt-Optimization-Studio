import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { runPrompt } from "@/lib/ai/prompt-engine";

const executeSchema = z.object({
  content: z.string().optional(),
  variables: z.record(z.string()).optional(),
});

export async function generateStaticParams() {
  try {
    const prompts = await prisma.prompt.findMany({
      select: { id: true },
    });
    
    return prompts.map((prompt) => ({
      id: prompt.id,
    }));
  } catch (error) {
    console.error("Error generating static params for prompts:", error);
    return [];
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { content, variables } = executeSchema.parse(body);

    const prompt = await prisma.prompt.findUnique({ where: { id: params.id } });
    if (!prompt) return NextResponse.json({ error: "Prompt not found." }, { status: 404 });

    const result = await runPrompt({
      model: prompt.model,
      content: content ?? prompt.content,
      variables,
    });

    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not execute prompt." }, { status: 500 });
  }
}
