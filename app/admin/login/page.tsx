"use client";

import { useRouter } from "next/navigation";
import { FingerprintLock } from "@/components/admin/fingerprint-lock";

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <FingerprintLock
      onSuccess={() => {
        router.push("/admin");
      }}
    />
  );
}
