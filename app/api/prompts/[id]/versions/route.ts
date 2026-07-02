import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const createSchema = z.object({
  content: z.string().min(1),
  note: z.string().optional(),
});

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const versions = await prisma.promptVersion.findMany({
      where: { promptId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: versions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load versions." }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { content, note } = createSchema.parse(body);
    const [version] = await prisma.$transaction([
      prisma.promptVersion.create({ data: { promptId: params.id, content, note } }),
      prisma.prompt.update({ where: { id: params.id }, data: { content } }),
    ]);
    return NextResponse.json({ data: version }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message ?? "Invalid input." }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Could not save version." }, { status: 500 });
  }
}