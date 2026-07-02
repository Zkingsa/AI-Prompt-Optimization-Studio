import { NextResponse } from "next/server";

/**
 * Inbound webhook endpoint for external integrations (e.g. a CI pipeline
 * triggering a test suite run, or a billing provider notifying of usage).
 * Verify the signature for whatever provider you wire up before trusting
 * the payload — this currently accepts any POST body.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("Received webhook:", payload?.type ?? "unknown");

    // TODO: verify signature header, then route based on payload.type
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }
}