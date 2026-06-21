import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-center px-6">
      <div className="mx-auto max-w-3xl w-full py-20 sm:py-32">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-50">
            Hi, I'm <span className="text-zinc-500 dark:text-zinc-400">aldenderf</span>.
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl">
            I'm a full-stack developer specializing in building clean, modern web applications. 
            I focus on performance, rich aesthetics, and elegant user experiences.
          </p>
          <div className="flex items-center gap-4 text-base font-semibold">
            <Link
              href="/projects"
              className="text-zinc-900 underline underline-offset-4 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
            >
              View Projects
            </Link>
            <span className="text-zinc-300 dark:text-zinc-800">|</span>
            <Link
              href="/blog"
              className="text-zinc-900 underline underline-offset-4 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
            >
              Read My Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

