"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { profileData } from "@/data/portfolio";

interface ProfileAvatarProps {
  avatarLight?: string;
  avatarDark?: string;
  name?: string;
}

const emptySubscribe = () => () => {};

export function ProfileAvatar({
  avatarLight = profileData.avatarLight,
  avatarDark = profileData.avatarDark,
  name = profileData.name,
}: ProfileAvatarProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="relative group w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px] mx-auto md:mx-0">
      {/* Subtle Background Glow Ring */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900 opacity-50 blur-md group-hover:opacity-80 transition duration-500" />

      {/* Main Square Avatar Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100 dark:bg-zinc-900 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Light Mode Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            !mounted || !isDark
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <Image
            src={avatarLight}
            alt={name}
            fill
            sizes="(max-width: 768px) 300px, 380px"
            className="object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
            priority
          />
        </div>

        {/* Dark Mode Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            mounted && isDark
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <Image
            src={avatarDark}
            alt={name}
            fill
            sizes="(max-width: 768px) 300px, 380px"
            className="object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
            priority
          />
        </div>
      </div>
    </div>
  );
}
