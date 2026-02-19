import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // TODO: Verify webhook signature and handle events
  // - checkout.session.completed → create purchase record
  // - account.updated → update seller connect status

  return NextResponse.json({ received: true });
}
