"use client";

import { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Fingerprint,
  Plus,
  CheckCircle,
  AlertCircle,
  Laptop,
} from "lucide-react";

// Base64URL ArrayBuffer helpers
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

export function SecuritySettings() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinMsg, setPinMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pinLoading, setPinLoading] = useState(false);

  const [enrollMsg, setEnrollMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [enrollLoading, setEnrollLoading] = useState(false);

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinMsg(null);

    if (newPin !== confirmPin) {
      setPinMsg({ type: "error", text: "New PIN and Confirmation PIN do not match." });
      return;
    }

    if (newPin.length < 4) {
      setPinMsg({ type: "error", text: "PIN must be at least 4 digits long." });
      return;
    }

    setPinLoading(true);
    try {
      const res = await fetch("/api/admin/auth/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPin, newPin }),
      });

      const json = await res.json();

      if (res.ok) {
        setPinMsg({ type: "success", text: "Master PIN updated successfully!" });
        setCurrentPin("");
        setNewPin("");
        setConfirmPin("");
      } else {
        setPinMsg({ type: "error", text: json.error || "Failed to update Master PIN." });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating Master PIN";
      setPinMsg({ type: "error", text: msg });
    } finally {
      setPinLoading(false);
    }
  };

  const handleEnrollDevice = async () => {
    setEnrollMsg(null);
    setEnrollLoading(true);

    try {
      const resOptions = await fetch("/api/admin/auth/register");
      if (!resOptions.ok) throw new Error("Failed to fetch registration options");

      const options = await resOptions.json();

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
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

      if (!saveRes.ok) throw new Error("Failed to save fingerprint key");

      setEnrollMsg({
        type: "success",
        text: "Fingerprint scanner on this device enrolled successfully!",
      });
    } catch (err: unknown) {
      console.error("Device enrollment error:", err);
      const msg = err instanceof Error ? err.message : "Could not enroll device fingerprint.";
      setEnrollMsg({ type: "error", text: msg });
    } finally {
      setEnrollLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Security & Passcode Settings</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            Master PIN & Biometric Passkeys
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Change your secret Master PIN and enroll fingerprint scanners across your devices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Change Master PIN Form */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <KeyRound className="h-4 w-4 text-amber-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Change Master PIN
            </h3>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Your Master PIN serves as the fallback unlock passcode if fingerprint scanning is unavailable.
          </p>

          {pinMsg && (
            <div
              className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium ${
                pinMsg.type === "success"
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
              }`}
            >
              {pinMsg.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              )}
              <span>{pinMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleChangePin} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Current Master PIN
              </label>
              <input
                type="password"
                required
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="Enter current PIN"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                New Secret PIN
              </label>
              <input
                type="password"
                required
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter new 6-digit PIN"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Confirm New Secret PIN
              </label>
              <input
                type="password"
                required
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="Re-enter new PIN"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <button
              type="submit"
              disabled={pinLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{pinLoading ? "Updating PIN..." : "Save New Master PIN"}</span>
            </button>
          </form>
        </div>

        {/* Enroll New Device Biometrics */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Fingerprint className="h-4 w-4 text-emerald-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Enroll Fingerprint Scanner
            </h3>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Register the fingerprint sensor or Touch ID / Windows Hello on your current device for instant biometric access.
          </p>

          {enrollMsg && (
            <div
              className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium ${
                enrollMsg.type === "success"
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
              }`}
            >
              {enrollMsg.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              )}
              <span>{enrollMsg.text}</span>
            </div>
          )}

          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <Laptop className="h-6 w-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                  Current Hardware Device
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Click below to launch your system&apos;s biometric prompt (Windows Hello / Touch ID).
                </p>
              </div>
            </div>

            <button
              onClick={handleEnrollDevice}
              disabled={enrollLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              <span>
                {enrollLoading
                  ? "Scanning Hardware Sensor..."
                  : "Enroll This Device's Fingerprint"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
