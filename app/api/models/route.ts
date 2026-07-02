import { NextResponse } from "next/server";

const MODELS = [
  { id: "gpt-4o", provider: "openai", label: "GPT-4o", contextWindow: 128000 },
  { id: "gpt-4o-mini", provider: "openai", label: "GPT-4o mini", contextWindow: 128000 },
  { id: "claude-sonnet-4-6", provider: "anthropic", label: "Claude Sonnet 4.6", contextWindow: 200000 },
  { id: "gemini-1.5-pro", provider: "google", label: "Gemini 1.5 Pro", contextWindow: 1000000 },
];

export async function GET() {
  return NextResponse.json({ data: MODELS });
}