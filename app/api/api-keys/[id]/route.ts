import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.apiKey.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete API key." }, { status: 500 });
  }
}