import { NextResponse } from "next/server";
import { z } from "zod";
import { runPrompt } from "@/lib/ai/prompt-engine";

const schema = z.object({
  model: z.string(),
  content: z.string().min(1),
  variables: z.record(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model, content, variables } = schema.parse(body);
    const result = await runPrompt({ model, content, variables });
    return NextResponse.json({ data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Run failed." }, { status: 500 });
  }
}