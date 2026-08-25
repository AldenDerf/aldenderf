import { NextResponse } from "next/server";
import {
  getWebAuthnStore,
  saveWebAuthnStore,
  verifyAdminSession,
} from "@/lib/webauthn-service";

export async function POST(request: Request) {
  try {
    const isAuth = await verifyAdminSession();
    if (!isAuth) {
      return NextResponse.json(
        { error: "Unauthorized. Please unlock Admin Studio first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { currentPin, newPin } = body;

    if (!currentPin || !newPin || newPin.length < 4) {
      return NextResponse.json(
        { error: "Invalid PIN format. PIN must be at least 4 digits." },
        { status: 400 }
      );
    }

    const store = getWebAuthnStore();

    if (currentPin !== store.masterPin) {
      return NextResponse.json(
        { error: "Incorrect Current Master PIN" },
        { status: 400 }
      );
    }

    store.masterPin = newPin;
    saveWebAuthnStore(store);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating Master PIN:", err);
    return NextResponse.json(
      { error: "Failed to update Master PIN" },
      { status: 500 }
    );
  }
}
