import { NextResponse } from "next/server";
import { TEMPLATES } from "../data";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const template = TEMPLATES.find((t) => t.id === params.id);
  if (!template) return NextResponse.json({ error: "Template not found." }, { status: 404 });
  return NextResponse.json({ data: template });
}

export async function PUT() {
  return NextResponse.json({ error: "Templates are read-only in this build." }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Templates are read-only in this build." }, { status: 501 });
}