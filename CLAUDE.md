# CLAUDE.md

This project-specific instruction file is read by Claude Code and other AI assistants to bootstrap context and establish operational constraints.

## Guide & Guidelines Reference
For full coding standards, architectural details, and project conventions, refer to the main guidelines file:
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
- **Progress Tracking**: Always update and check off completed items in `ROADMAP.md`, and log the changes in the Change Log ledger before committing.


