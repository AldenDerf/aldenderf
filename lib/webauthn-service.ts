import fs from "fs";
import path from "path";
import crypto from "crypto";
import { cookies } from "next/headers";

const CREDENTIALS_FILE = path.join(
  process.cwd(),
  "data",
  "webauthn-credentials.json"
);

export interface SavedCredential {
  id: string; // base64url credential id
  publicKey: string; // base64url public key or raw
  counter: number;
  transports?: string[];
  createdAt: string;
}

export interface WebAuthnStore {
  masterPin: string; // Master PIN fallback (default: "123456" or custom)
  credentials: SavedCredential[];
}

const DEFAULT_STORE: WebAuthnStore = {
  masterPin: "123456",
  credentials: [],
};

// Memory cache
let memoryStore: WebAuthnStore | null = null;

export function getWebAuthnStore(): WebAuthnStore {
  if (memoryStore) return memoryStore;

  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const raw = fs.readFileSync(CREDENTIALS_FILE, "utf-8");
      memoryStore = JSON.parse(raw);
      return memoryStore!;
    }
  } catch (err) {
    console.error("Error reading webauthn-credentials.json:", err);
  }

  memoryStore = DEFAULT_STORE;
  return memoryStore;
}

export function saveWebAuthnStore(store: WebAuthnStore): boolean {
  try {
    memoryStore = store;
    const dir = path.dirname(CREDENTIALS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(store, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving webauthn-credentials.json:", err);
    return false;
  }
}

// Utility: Helper to extract hostname/rpId dynamically for production & dev
export function getRelyingPartyId(hostHeader: string | null): string {
  if (!hostHeader) return "localhost";
  // Remove port numbers if present e.g. "localhost:3000" -> "localhost" or "aldenderf.dev:443" -> "aldenderf.dev"
  const host = hostHeader.split(":")[0];
  return host || "localhost";
}

// Utility: Generate cryptographically strong base64url random challenge
export function generateChallenge(): string {
  return crypto.randomBytes(32).toString("base64url");
}

// Session cookie helper
export const SESSION_COOKIE_NAME = "admin_session_token";

export async function createAdminSession(): Promise<string> {
  const token = crypto.randomBytes(48).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return token;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME);
  return Boolean(sessionToken && sessionToken.value);
}
