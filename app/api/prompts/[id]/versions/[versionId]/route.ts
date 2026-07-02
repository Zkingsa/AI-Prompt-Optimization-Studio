import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    const version = await prisma.promptVersion.findUnique({ where: { id: params.versionId } });
    if (!version) return NextResponse.json({ error: "Version not found." }, { status: 404 });
    return NextResponse.json({ data: version });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load version." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  try {
    await prisma.promptVersion.delete({ where: { id: params.versionId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not delete version." }, { status: 500 });
  }
}