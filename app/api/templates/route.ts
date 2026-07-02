import { NextResponse } from "next/server";
import { TEMPLATES } from "./data";

export async function GET() {
  return NextResponse.json({
    data: TEMPLATES.map(({ content, ...meta }) => meta),
  });
}

export async function POST() {
  return NextResponse.json(
    { error: "Creating custom templates isn't supported yet." },
    { status: 501 }
  );
}