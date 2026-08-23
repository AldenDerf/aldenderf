import { NextResponse } from "next/server";
import {
  getWebAuthnStore,
  getRelyingPartyId,
  generateChallenge,
  createAdminSession,
} from "@/lib/webauthn-service";

export async function GET(request: Request) {
  const host = request.headers.get("host");
  const rpId = getRelyingPartyId(host);
  const challenge = generateChallenge();
  const store = getWebAuthnStore();

  const allowCredentials = store.credentials.map((c) => ({
    id: c.id,
    type: "public-key" as const,
    transports: c.transports || ["internal"],
  }));

  const options = {
    challenge,
    timeout: 60000,
    rpId,
    userVerification: "preferred",
    allowCredentials,
  };

  return NextResponse.json(options);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin, credential } = body;
    const store = getWebAuthnStore();

    // 1. PIN Fallback Authentication
    if (pin !== undefined) {
      if (pin === store.masterPin) {
        await createAdminSession();
        return NextResponse.json({ success: true, method: "pin" });
      } else {
        return NextResponse.json(
          { error: "Incorrect Master PIN" },
          { status: 401 }
        );
      }
    }

    // 2. WebAuthn Fingerprint Authentication
    if (credential && credential.id) {
      const validCred = store.credentials.find((c) => c.id === credential.id);

      // If registered credentials exist, ensure credential matches
      if (store.credentials.length > 0 && !validCred) {
        return NextResponse.json(
          { error: "Unrecognized biometric fingerprint credential" },
          { status: 401 }
        );
      }

      await createAdminSession();
      return NextResponse.json({ success: true, method: "webauthn" });
    }

    return NextResponse.json(
      { error: "Missing credential or authentication payload" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Error authenticating WebAuthn:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
