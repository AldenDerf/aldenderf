# Project Guidelines for Coding Agents

Welcome to **aldenderf**, a modern Next.js website/portfolio project. This document serves as the guide for all AI coding agents working on this repository to maintain consistency, structure, and optimal performance.

---

## Tech Stack & Configuration

- **Framework**: Next.js 16 (using the App Router & Turbopack)
- **Runtime & Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (using Vanilla CSS integration via PostCSS)
- **Package Manager**: `pnpm` (Workspace configured)

---

## Key Commands

Use the following commands to develop, test, and build the project:

- **Run Dev Server**: `pnpm run dev`
- **Build Production Bundle**: `pnpm run build`
- **Lint Code**: `pnpm run lint`
- **Install Dependencies**: `pnpm install`

---

## Coding Standards & Best Practices

### 1. Next.js App Router & Server Components
- **Server First**: All components in the `app` directory are React Server Components (RSC) by default. Keep them as Server Components whenever possible.
- **Client Components**: Use `"use client"` at the very top of files *only* when utilizing client-side features:
  - Interactivity, event listeners (`onClick`, `onChange`, etc.)
  - React Hooks (`useState`, `useEffect`, `useContext`, `useRef`, etc.)
  - Browser-only APIs (e.g., `window`, `document`)
- **Data Fetching**: Fetch data directly in server components using standard `async/await` where applicable.

### 2. Styling (Tailwind CSS v4)
- This project uses **Tailwind CSS v4**.
- Do not use Tailwind v3 configurations (`tailwind.config.js` is deprecated in v4). 
- Theme customization, custom utilities, and `@theme` directives are placed in the CSS entry point (e.g. `app/globals.css` or postcss configuration).
- Avoid creating custom style utilities unless absolutely necessary. Stick to Tailwind's core classes.

### 3. TypeScript
- Always write fully typed TypeScript. Avoid the `any` type.
- Declare interfaces or types for component props.
- Use Next.js built-in types (e.g., `Metadata` for page metadata, standard event types).

### 4. Import Aliases
- Use the import alias `@/*` to reference files inside the `src` / root folders relative to the configuration.
- Example: `import Button from '@/components/Button'`

---

## File Structure Overview

- `/app`: App router pages, layouts, and global styles.
- `/public`: Static assets (images, icons, etc.).
- `pnpm-workspace.yaml`: Workspace-wide configurations (allowed build scripts like `sharp` are defined here).
- `tsconfig.json`: TypeScript configuration.
- `eslint.config.mjs`: ESLint configuration.

---

## Git Workflow & Automatic Commits

- **Commit After Success**: After completing a task, feature, or bug fix successfully, the agent should automatically stage and commit the changes.
- **Conventional Commits**: Commit messages must follow the conventional commit format:
  - `feat: ...` for new features
  - `fix: ...` for bug fixes
  - `chore: ...` for build task changes or configuration updates
  - `docs: ...` for documentation changes
- **Workflow Step**: Make sure to check that the build (`pnpm run build`) succeeds before committing any changes.

---

## Progress & Feature Tracking

- **Maintain Roadmap**: Whenever you implement a new feature, fix a bug, or add a configuration:
  1. Update `ROADMAP.md` by checking off the completed task.
  2. Add a short entry describing the change in the **Change Log & Progress Ledger** section of `ROADMAP.md`.
  3. Ensure these updates are committed along with the code changes.


