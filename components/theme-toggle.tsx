"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center h-9 w-9 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 cursor-pointer"
      aria-label="Toggle light/dark theme"
      title={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
    >
      {!mounted ? (
        <div className="h-4 w-4" />
      ) : resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 rotate-0 hover:scale-110" />
      ) : (
        <Moon className="h-4 w-4 text-zinc-700 transition-transform duration-200 rotate-0 hover:scale-110" />
      )}
    </button>
  );
}
