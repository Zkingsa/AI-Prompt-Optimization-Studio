import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { analyzePrompt } from "@/lib/optimization/analyzer";
import { generateSuggestions } from "@/lib/optimization/optimizer";

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

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const prompt = await prisma.prompt.findUnique({ where: { id: params.id } });
    if (!prompt) return NextResponse.json({ error: "Prompt not found." }, { status: 404 });

    const analysis = analyzePrompt(prompt.content);
    const suggestions = generateSuggestions(prompt.content, analysis);

    return NextResponse.json({ data: { analysis, suggestions } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not generate suggestions." }, { status: 500 });
  }
}
