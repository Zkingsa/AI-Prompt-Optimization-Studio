import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function generateStaticParams() {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      select: { id: true },
    });
    
    return apiKeys.map((key) => ({
      id: key.id,
    }));
  } catch (error) {
    console.error("Error generating static params for API keys:", error);
    return [];
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.apiKey.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete API key." }, { status: 500 });
  }
}
