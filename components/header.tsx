"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-850 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          aldenderf
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-50"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-50"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-50"
          >
            Blog
          </Link>
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-50"
          >
            Admin
          </Link>

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5 text-zinc-400 hover:text-zinc-50" />
            ) : (
              <Moon className="h-5 w-5 text-zinc-600 hover:text-zinc-950" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
