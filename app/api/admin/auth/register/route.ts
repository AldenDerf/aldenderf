import { NextResponse } from "next/server";
import {
  getWebAuthnStore,
  saveWebAuthnStore,
  getRelyingPartyId,
  generateChallenge,
  createAdminSession,
  verifyAdminSession,
} from "@/lib/webauthn-service";

export async function GET(request: Request) {
  const host = request.headers.get("host");
  const rpId = getRelyingPartyId(host);
  const challenge = generateChallenge();

  const options = {
    rp: {
      name: "Portfolio Admin Studio",
      id: rpId,
    },
    user: {
      id: "admin-user-id",
      name: "admin@portfolio",
      displayName: "Portfolio Administrator",
    },
    challenge,
    pubKeyCredParams: [
      { type: "public-key", alg: -7 }, // ES256
      { type: "public-key", alg: -257 }, // RS256
    ],
    timeout: 60000,
    authenticatorSelection: {
      userVerification: "preferred", // Prompts Touch ID / Windows Hello / Fingerprint
      residentKey: "preferred",
    },
    attestation: "none",
  };

  return NextResponse.json(options);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, rawId, response, pin } = body;

    if (!id || !rawId) {
      return NextResponse.json(
        { error: "Invalid credential payload" },
        { status: 400 }
      );
    }

    const store = getWebAuthnStore();
    const isAuth = await verifyAdminSession();

    // If there are existing credentials and user is NOT authenticated, require PIN verification
    if (store.credentials.length > 0 && !isAuth) {
      if (!pin || pin !== store.masterPin) {
        return NextResponse.json(
          { error: "Master PIN verification required to register new fingerprint" },
          { status: 401 }
        );
      }
    }

    // Save credential if not already stored
    const exists = store.credentials.some((c) => c.id === id);
    if (!exists) {
      store.credentials.push({
        id,
        publicKey: rawId,
        counter: 0,
        transports: response?.transports || ["internal"],
        createdAt: new Date().toISOString(),
      });
      saveWebAuthnStore(store);
    }

    // Issue authenticated session cookie
    await createAdminSession();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error saving WebAuthn registration:", err);
    return NextResponse.json(
      { error: "Failed to register fingerprint credential" },
      { status: 500 }
    );
  }
}
