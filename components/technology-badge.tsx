import type { IconType } from "react-icons";
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiTailwindcss,
  SiHtml5, SiNodedotjs, SiExpress, SiLaravel, SiPhp,
  SiPostgresql, SiSupabase, SiPrisma, SiMysql, SiGit, SiGithub,
  SiVite, SiPostman, SiVercel, SiInertia,
} from "react-icons/si";
import { Bot, Code2, Database, Server, Terminal } from "lucide-react";
import { FaCss3Alt } from "react-icons/fa6";

const technologyIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Laravel: SiLaravel,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Prisma: SiPrisma,
  "Prisma ORM": SiPrisma,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
  Vite: SiVite,
  Postman: SiPostman,
  Vercel: SiVercel,
  "Inertia.js": SiInertia,
};

function TechnologyIcon({ name }: { name: string }) {
  const normalizedName = name.replace(/\s+\d+(?:\.\d+)*$/, "");
  const Icon = technologyIcons[normalizedName];
  if (Icon) return <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />;
  if (name === "Microsoft SQL Server") return <Database aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />;
  if (name === "Windows Server") return <Server aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />;
  return <Code2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />;
}

export function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-md border border-zinc-200 bg-zinc-100/70 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      <TechnologyIcon name={name} />
      <span>{name}</span>
    </span>
  );
}

export function DeploymentBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      <TechnologyIcon name={name} />
      <span>{name}</span>
    </span>
  );
}

export function WorkflowBadge({ name }: { name: "ChatGPT" | "Codex" | "Antigravity" }) {
  const Icon = name === "Antigravity" ? Terminal : Bot;
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      <span>{name}</span>
    </span>
  );
}
