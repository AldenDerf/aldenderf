import Link from "next/link";
import { profileData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Mail, ArrowDownRight } from "lucide-react";

export function Hero() {
  return (
    <section id="about" className="pt-16 sm:pt-24 pb-12 sm:pb-20 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:gap-8 max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{profileData.statusBadge}</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
              {profileData.headline}
            </h1>
            <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {profileData.subtitle}
            </p>
          </div>

          {/* Bio Brief */}
          <div className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 space-y-2 border-l-2 border-zinc-300 dark:border-zinc-800 pl-4 py-1">
            {profileData.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs"
            >
              <span>View Projects</span>
              <ArrowDownRight className="h-4 w-4" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
            >
              <Mail className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* Social Icon Links */}
          <div className="flex items-center gap-5 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400">
            <span className="text-xs font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
              Connect:
            </span>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-1.5 text-sm hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
