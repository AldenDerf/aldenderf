"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Fingerprint,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Lock,
  ArrowRight,
  RefreshCw,
  Laptop,
} from "lucide-react";

interface FingerprintLockProps {
  onSuccess: () => void;
  hasRegisteredCredentials?: boolean;
}

const emptySubscribe = () => () => {};

function checkWebAuthnSupported(): boolean {
  if (typeof window === "undefined") return true;
  return Boolean(window.PublicKeyCredential && navigator.credentials);
}

// Helpers for Base64URL <-> ArrayBuffer conversion for WebAuthn
function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64UrlToBuffer(base64url: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const buffer = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    buffer[i] = rawData.charCodeAt(i);
  }
  return buffer.buffer;
}

interface AllowCredentialItem {
  id: string;
  transports?: AuthenticatorTransport[];
}

export function FingerprintLock({
  onSuccess,
  hasRegisteredCredentials = false,
}: FingerprintLockProps) {
  const isWebAuthnSupported = useSyncExternalStore(
    emptySubscribe,
    checkWebAuthnSupported,
    () => true
  );

  const [mode, setMode] = useState<"fingerprint" | "pin">(
    isWebAuthnSupported ? "fingerprint" : "pin"
  );
  const [pinInput, setPinInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hasRegistered, setHasRegistered] = useState(hasRegisteredCredentials);

  // WebAuthn Fingerprint Scanning (Authenticate)
  const handleFingerprintScan = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      // 1. Fetch challenge options from API
      const resOptions = await fetch("/api/admin/auth/authenticate");
      if (!resOptions.ok) {
        throw new Error("Failed to initialize WebAuthn challenge");
      }
      const options = await resOptions.json();

      // Convert challenge string to ArrayBuffer
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: base64UrlToBuffer(options.challenge),
          timeout: options.timeout || 60000,
          rpId: options.rpId,
          userVerification: options.userVerification || "preferred",
          allowCredentials: options.allowCredentials?.map(
            (c: AllowCredentialItem) => ({
              id: base64UrlToBuffer(c.id),
              type: "public-key" as const,
              transports: c.transports,
            })
          ),
        };

      // 2. Trigger native OS / Browser Fingerprint Prompt (Windows Hello / Touch ID)
      const credential = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential;

      if (!credential) {
        throw new Error("Biometric scan cancelled or failed");
      }

      // Convert response credential to JSON string payload
      const credentialPayload = {
        id: credential.id,
        rawId: bufferToBase64Url(credential.rawId),
        type: credential.type,
      };

      // 3. Send payload to API for verification & session cookie issue
      const verifyRes = await fetch("/api/admin/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialPayload }),
      });

      if (!verifyRes.ok) {
        const errJson = await verifyRes.json();
        throw new Error(errJson.error || "Biometric validation failed");
      }

      setSuccessMsg("Fingerprint verified! Unlocking Admin Studio...");
      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err: unknown) {
      console.error("Biometric scan error:", err);
      if (err instanceof Error && err.name === "NotAllowedError") {
        setErrorMsg("Biometric prompt cancelled or timed out.");
      } else {
        const msg =
          err instanceof Error
            ? err.message
            : "Fingerprint verification error. Try PIN fallback.";
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // WebAuthn Fingerprint Registration (First Time Setup / Enroll New Device)
  const handleRegisterFingerprint = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const resOptions = await fetch("/api/admin/auth/register");
      if (!resOptions.ok) throw new Error("Failed to fetch registration challenge");

      const options = await resOptions.json();

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions =
        {
          challenge: base64UrlToBuffer(options.challenge),
          rp: options.rp,
          user: {
            ...options.user,
            id: new TextEncoder().encode(options.user.id),
          },
          pubKeyCredParams: options.pubKeyCredParams,
          timeout: options.timeout,
          authenticatorSelection: options.authenticatorSelection,
          attestation: options.attestation,
        };

      // Trigger OS Biometric Registration Prompt (Touch ID / Windows Hello)
      const credential = (await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      })) as PublicKeyCredential;

      if (!credential) throw new Error("Fingerprint registration cancelled");

      const payload = {
        id: credential.id,
        rawId: bufferToBase64Url(credential.rawId),
        type: credential.type,
      };

      const saveRes = await fetch("/api/admin/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!saveRes.ok) throw new Error("Failed to save registered biometric key");

      setHasRegistered(true);
      setSuccessMsg("Fingerprint registered successfully! Unlocking...");
      setTimeout(() => {
        onSuccess();
      }, 800);
    } catch (err: unknown) {
      console.error("Registration error:", err);
      const msg =
        err instanceof Error ? err.message : "Could not register biometric key.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // PIN Fallback Handler
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Incorrect Master PIN");
      }

      setSuccessMsg("Master PIN verified! Unlocking...");
      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid Master PIN";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 font-sans text-zinc-100">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl">
        {/* Background Subtle Ambient Pulse Ring */}
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

        {/* Header Icon */}
        <div className="relative flex flex-col items-center text-center space-y-4">
          <div className="relative group flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-800/80 border border-zinc-700/80 shadow-lg">
            <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-md" />

            {mode === "fingerprint" ? (
              <Fingerprint className="h-10 w-10 text-emerald-400 animate-pulse" />
            ) : (
              <KeyRound className="h-9 w-9 text-amber-400" />
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-medium text-emerald-400 mb-2">
              <Lock className="h-3 w-3" />
              <span>Biometric Protected</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Portfolio Admin Studio
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xs mx-auto">
              {mode === "fingerprint"
                ? "Scan your fingerprint via Touch ID, Windows Hello, or Android Biometrics."
                : "Enter your Master PIN to unlock the admin dashboard."}
            </p>
          </div>
        </div>

        {/* Error / Success Notifications */}
        {errorMsg && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-zinc-950 p-1 border border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setMode("fingerprint")}
            disabled={!isWebAuthnSupported}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-colors cursor-pointer ${
              mode === "fingerprint"
                ? "bg-zinc-800 text-emerald-400 shadow-xs"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Fingerprint className="h-3.5 w-3.5" />
            <span>Fingerprint</span>
          </button>

          <button
            onClick={() => setMode("pin")}
            className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-colors cursor-pointer ${
              mode === "pin"
                ? "bg-zinc-800 text-amber-400 shadow-xs"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>Master PIN</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="mt-6">
          {mode === "fingerprint" ? (
            <div className="space-y-4">
              <button
                onClick={handleFingerprintScan}
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition duration-200 shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-zinc-950" />
                ) : (
                  <Fingerprint className="h-5 w-5 text-zinc-950 group-hover:scale-110 transition-transform" />
                )}
                <span>
                  {loading ? "Scanning Fingerprint..." : "Scan Fingerprint to Unlock"}
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-center pt-2">
                <button
                  onClick={handleRegisterFingerprint}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>
                    {hasRegistered
                      ? "Enroll Additional Fingerprint / Passkey"
                      : "Register Fingerprint / Passkey on this device"}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center pt-3 text-[11px] text-zinc-500 border-t border-zinc-800/80">
                <Laptop className="h-3.5 w-3.5" />
                <span>Compatible with Windows Hello, Touch ID, & Android</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Master PIN Passcode
                </label>
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Master PIN (Default: 123456)"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-zinc-950" />
                ) : (
                  <KeyRound className="h-4 w-4 text-zinc-950" />
                )}
                <span>{loading ? "Verifying..." : "Unlock with PIN"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
