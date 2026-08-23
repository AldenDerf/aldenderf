import { NextResponse } from "next/server";
import {
  verifyAdminSession,
  clearAdminSession,
  getWebAuthnStore,
} from "@/lib/webauthn-service";

export async function GET() {
  const authenticated = await verifyAdminSession();
  const store = getWebAuthnStore();
  const hasRegisteredCredentials = store.credentials.length > 0;

  return NextResponse.json({
    authenticated,
    hasRegisteredCredentials,
  });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true });
}
