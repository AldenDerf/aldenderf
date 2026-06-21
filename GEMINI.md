# GEMINI.md

This file is configured for Google Gemini Code Assist, Antigravity, and other Gemini-powered coding tools to bootstrap project context.

## Guide & Guidelines Reference
For the full coding standards, architectural details, and project conventions, refer to the main guidelines file:
👉 **[AGENTS.md](./AGENTS.md)**

## Essential Commands

- **Install Dependencies**: `pnpm install`
- **Start Development Server**: `pnpm run dev`
- **Build Project**: `pnpm run build`
- **Run Linting**: `pnpm run lint`

## Project Rules & Constraints

- **Package Manager**: Always use `pnpm`. Do not use `npm` or `yarn`.
- **Allowed Builds**: Build scripts for dependencies (`sharp`, `unrs-resolver`, etc.) must be allowed via `pnpm-workspace.yaml`.
- **Server/Client Boundary**: Default to React Server Components. Use `"use client"` only when interactive UI or hooks are required.
- **Styling**: Use Tailwind CSS v4 utility classes.
- **Git Auto-Commit**: Automatically stage and commit changes with conventional commits (`feat: ...`, `fix: ...`, etc.) after successfully completing a task (verify with `pnpm run build` first).

