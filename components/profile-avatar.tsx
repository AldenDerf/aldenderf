"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { profileData } from "@/data/portfolio";

export function ProfileAvatar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="relative group shrink-0">
      {/* Subtle Background Glow Ring */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900 opacity-70 blur-md group-hover:opacity-100 transition duration-500" />

      {/* Main Avatar Container */}
      <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-2xl overflow-hidden border-2 border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
        {/* Light Mode Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            !mounted || !isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-95 -rotate-1 pointer-events-none"
          }`}
        >
          <Image
            src={profileData.avatarLight}
            alt={`${profileData.name} - Light Theme`}
            fill
            sizes="(max-width: 768px) 192px, 256px"
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
            src={profileData.avatarDark}
            alt={`${profileData.name} - Dark Theme`}
            fill
            sizes="(max-width: 768px) 192px, 256px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Subtle Overlay Shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Floating Mode Badge Indicator */}
      <div className="absolute -bottom-2 -right-2 rounded-full border border-zinc-200 bg-white/90 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-700 shadow-md backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300">
        {mounted ? (isDark ? "Dark Mode" : "Light Mode") : "Theme"}
      </div>
    </div>
  );
}
