import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const run = await prisma.testRun.findFirst({
      where: { testSuiteId: params.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: run });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load results." }, { status: 500 });
  }
}