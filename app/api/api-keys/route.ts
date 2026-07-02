import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { encrypt } from "@/lib/utils/encryption";

const createSchema = z.object({
  provider: z.enum(["openai", "anthropic", "google"]),
  label: z.string().min(1),
  value: z.string().min(1),
});

export async function GET() {
  try {
    const keys = await prisma.apiKey.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, provider: true, label: true, createdAt: true },
    });
    return NextResponse.json({ data: keys });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load API keys." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, label, value } = createSchema.parse(body);
    const key = await prisma.apiKey.create({
      data: { provider, label, encryptedKey: encrypt(value) },
      select: { id: true, provider: true, label: true, createdAt: true },
    });
    return NextResponse.json({ data: key }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not save API key." }, { status: 500 });
  }
}