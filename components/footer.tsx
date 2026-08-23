"use client";

import Link from "next/link";
import { ProfileInfo, profileData } from "@/data/portfolio";
import { ArrowUp, Terminal, Settings } from "lucide-react";

interface FooterProps {
  profile?: ProfileInfo;
}

export function Footer({ profile = profileData }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 font-mono text-xs">
              <Terminal className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript & Tailwind CSS.
            </p>
          </div>

          {/* Quick Nav Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <Link href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Experience
            </Link>
            <Link href="#skills" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Skills
            </Link>
            <Link href="#certifications" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Certifications
            </Link>
            <Link href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              <Settings className="h-3 w-3" />
              <span>Admin</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
