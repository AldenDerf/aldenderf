# Gemini Style Guide

This style guide aligns Gemini's code suggestions, auto-completions, and chat responses with the project's coding standards.

For the full detailed coding guidelines, please refer to the project's agent rules:
👉 **[AGENTS.md](../AGENTS.md)**

## Tech Stack Rules
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Library**: React 19
- **Styling**: Tailwind CSS v4 (using vanilla CSS via PostCSS)
- **Language**: TypeScript (write fully typed, avoid `any`)
- **Package Manager**: `pnpm` (use workspaces config)

## Key Instructions for Gemini
1. **Server Components First**: All files in the `app` directory are Server Components by default. Only add `"use client"` when state or event listeners are required.
2. **Tailwind CSS v4**: Theme adjustments and custom classes belong in the CSS entry point (e.g., `app/globals.css`). Do not suggest or create `tailwind.config.js`.
3. **Import Aliases**: Reference root/src components using the `@/*` alias (e.g., `@/components/Button`).
4. **Code Quality**: Write clean, modern, and production-ready code. Keep component size minimal and avoid placeholders.
5. **Git Auto-Commits**: After completing any vibe coding changes, tasks, or features, automatically stage and commit the changes using conventional commits (e.g. `feat: ...`, `fix: ...`, `chore: ...`). Ensure the project builds successfully before committing.

