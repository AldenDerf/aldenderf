# Project Roadmap & Progress Ledger

This document tracks the features, progress, and upcoming tasks of the **aldenderf** portfolio project. It serves as a persistent guide for coding agents (like Gemini and Antigravity) across all your devices.

---

## 🚀 Current Project Status
- **Last Updated**: June 21, 2026
- **Current Phase**: Phase 1: Setup & Configuration

---

## 📋 Feature Checklist

### TASK 1: INITIALIZATION & THEME CONFIGURATION
- [x] Use the terminal to initialize a new Next.js project if one doesn't exist, using TypeScript, Tailwind CSS, and the App Router.
- [x] Install `next-themes` and `lucide-react`.
- [x] Configure class-based dark mode (`darkMode: 'class'`) using a clean Zinc palette (handled via `@custom-variant dark` in globals.css for Tailwind v4).
- [x] Create a global layout file, a `ThemeProvider` component to eliminate layout flashes, and a minimalist Header component containing a functional Sun/Moon light/dark mode toggle.

### TASK 2: DATABASE ARCHITECTURE (PRISMA & SUPABASE)
- [ ] Install `prisma` and `@prisma/client`.
- [ ] Generate a `schema.prisma` file with a `Post` model containing: id, title, slug, content (Text type for rich text), description, category (e.g., "Tutorial", "Dev Log"), coverImage (String nullable), published (Boolean), createdAt, and updatedAt.
- [ ] Set up a database client instance file at `src/lib/prisma.ts`.

### TASK 3: USER-FACING PORTFOLIO & BLOG FRONTEND
- [x] **Home / Hero View:** Create a sleek, modern developer hero layout with status badge, headline, subtitle, CTAs, and social links.
- [x] **Projects View:** Design a clean, minimal 2-column/card grid layout highlighting 3 flagship projects with subtle borders, tech tags, technical highlights, and live/GitHub action links.
- [x] **Experience & Background Timeline:** Build a vertical timeline covering Administrative Assistant (Procurement), Computer Programmer (Laravel), Full-Stack Specialization, and Part-Time IT Instructor.
- [x] **Technical Skills:** Organize technical capabilities into 4 distinct badge grids (Frontend, Backend & APIs, Databases & Tools, Concepts).
- [x] **Contact Section & Footer:** Add interactive contact form with clipboard email copy feature, mailto prefill, direct channel cards, and minimal footer with top scroll navigation.
- [x] **Modular Data & Resume:** Store portfolio data in `@/data/portfolio.ts` and add sample `public/resume.pdf` for direct download link.
- [ ] **Blog Feed View:** Build a clean list that queries the database via Prisma to render published posts ordered by date (`Date — Title`) with a subtle category badge.
- [ ] **Dynamic Post Page (`app/blog/[slug]/page.tsx`):**
  - Implement fetching the post data by slug.
  - Layout a crisp, wide featured cover image using `next/image` right below the header.
  - Wrap the content body inside a container using `@tailwindcss/typography` (`prose prose-zinc dark:prose-invert max-w-none`) so the raw rich-text HTML displays beautifully.

### TASK 4: DASHBOARD SECURITY (SUPABASE AUTH & MIDDLEWARE)
- [ ] Install the necessary Supabase auth helper packages for Next.js.
- [ ] Create a secure, minimalist Login route at `/login`.
- [ ] Implement a Next.js Edge Middleware (`middleware.ts`) that intercepts paths directed at `/admin/*`. Ensure that any unauthenticated user or unauthorized email is immediately blocked and redirected to the home page.

### TASK 5: NOTION-STYLE VISUAL EDITING CANVAS (TIPTAP)
- [ ] Install `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, and `@tiptap/extension-link`.
- [ ] Create a `RichTextEditor.tsx` component. Apply Tailwind typography styling directly inside the active editing canvas so my writing workspace looks identical to the final public blog page.
- [ ] Build an elegant formatting toolbar (or a Medium-style floating bubble menu) supporting Bold, Italic, Code Blocks, Headings, and an Image URL insert.

### TASK 6: MANAGEMENT WORKSPACE & DATA MUTATIONS
- [ ] **Main Admin Page (`/admin/dashboard`):** Build a clean list layout of all existing entries with clear status badges showing "Draft" or "Published", along with a "Create New Post" link.
- [ ] **Editor Forms (`/admin/new` & `/admin/edit/[id]`):** Create standard input fields for Title, Description, Category, Cover Image URL, and hook up the custom TipTap component.
- [ ] Write the respective Next.js Server Actions or API handlers to process database creating, updating, and deleting via Prisma.

### TASK 7: CERTIFICATIONS MANAGEMENT (FUTURE FEATURE)
- [ ] **Database Schema**: Add `Certification` model to `schema.prisma` with: id, name, issuer, issueDate, verificationUrl, credentialId.
- [ ] **Portfolio Integration**: Render a clean, minimalist credentials section on the user-facing site.
- [ ] **Admin Certification Panel**: Create a dedicated tab/form in the `/admin/dashboard` to add, update, or remove certifications via Server Actions.

---

## 📈 Change Log & Progress Ledger
All significant changes and feature updates vibe coded by the AI agent should be logged here:

- **2026-08-23**:
  - Repositioned profile avatar to the top of the Hero section in a mobile-first column layout.
  - Removed floating theme mode badge label from the avatar frame for a cleaner, minimalist aesthetic.
  - Added dual profile image feature with smooth light/dark mode cross-fade transition using `next-themes` and `Next.js Image`.
  - Created [`components/profile-avatar.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/profile-avatar.tsx) with glassmorphism ring border, drop shadow, and hover elevation.
  - Linked `public/profile/what shirt with white background.png` for Light Mode and `public/profile/Black shirt with shades.png` for Dark Mode.
  - Implemented modern, minimal, high-performance developer portfolio website for Alden Derf.
  - Centralized portfolio data in `@/data/portfolio.ts` with full TypeScript interfaces for projects, experience timeline, skills, and profile metadata.
  - Built modular React components: `Hero`, `Projects`, `Experience`, `Skills`, `Contact`, `ThemeToggle`, `Header`, and `Footer`.
  - Configured class-based light/dark mode with `next-themes` and smooth CSS transitions.
  - Added smooth section scrolling, mobile drawer navigation, direct resume PDF download, interactive contact form with clipboard copy, and social links.
- **2026-06-21**:
  - Allowed `sharp` and `unrs-resolver` build scripts in `pnpm-workspace.yaml`.
  - Initialized local Git repository.
  - Created coding agent rule files (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `.gemini/` configurations).
  - Added `ROADMAP.md` for cross-device progress tracking.
  - Completed Task 1: Installed `next-themes` and `lucide-react`, configured Tailwind CSS v4 class-based dark mode, created `ThemeProvider` & layout header navigation with toggle button, and created typographic homepage.
  - Updated layout metadata and icons configuration to use `favicon.png` from the public folder, and removed the default `favicon.ico`.
  - Added TASK 7: Certifications Management to the roadmap as a future feature plan.



