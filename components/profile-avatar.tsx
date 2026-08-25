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
    <div className="relative group shrink-0">
      {/* Subtle Background Glow Ring */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 dark:from-emerald-500/20 dark:via-teal-500/20 dark:to-cyan-500/20 opacity-70 blur-md group-hover:opacity-100 transition duration-500" />

      {/* Main Avatar Container */}
      <div className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-2xl overflow-hidden border-2 border-zinc-200/90 dark:border-zinc-800/90 bg-zinc-100 dark:bg-zinc-900 shadow-xl transition-transform duration-500 group-hover:scale-[1.03]">
        {/* Light Mode Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            !mounted || !isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-95 -rotate-1 pointer-events-none"
          }`}
        >
          <Image
            src={avatarLight}
            alt={name}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Dark Mode Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            mounted && isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-95 rotate-1 pointer-events-none"
          }`}
        >
          <Image
            src={avatarDark}
            alt={name}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Subtle Overlay Shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}
