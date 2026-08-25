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
- [x] **Main Admin Page (`/admin`):** Built clean, high-performance dashboard layout with overview statistics, live sync status, tab switching, and toast alerts.
- [x] **About Section Manager:** Built form editor for editing bio paragraphs, headline, subtitle, availability badge, status, email, GitHub/LinkedIn links, resume URL, and avatars.
- [x] **Featured Engineering (Projects) Manager:** Built full CRUD (Add, Edit, Delete, Toggle Featured) for flagship engineering projects with tech stack and highlight bullet managers.
- [x] **Experience Timeline Manager:** Built full CRUD (Add, Edit, Delete) for career path timeline entries, roles, companies, locations, periods, descriptions, highlights, and skill tags.
- [x] **Skills Manager:** Built full CRUD (Add, Edit, Delete) for skill categories and individual skill tags.
- [x] **Social & Contact Channels Manager:** Built full CRUD (Add, Edit, Delete, Enable/Disable) for custom channels (GitHub, LinkedIn, Email, Twitter/X, YouTube, Telegram, Discord, custom links) with dynamic icons.
- [x] **Real-Time Data Persistence:** Implemented JSON file store (`data/portfolio-store.json`), service layer (`lib/portfolio-service.ts`), and API route (`app/api/portfolio/route.ts`).

### TASK 8: WEBAUTHN BIOMETRIC (FINGERPRINT / PASSKEY) AUTHENTICATION
- [x] **WebAuthn Passkey Engine**: Built [`lib/webauthn-service.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/lib/webauthn-service.ts) handling dynamic `rp.id` resolution for production hostnames (`localhost` & production custom domains), base64url challenge generation, credential key storage, and HTTP-only session cookie management.
- [x] **Biometric API Routes**: Built WebAuthn registration ([`app/api/admin/auth/register/route.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/api/admin/auth/register/route.ts)), authentication ([`app/api/admin/auth/authenticate/route.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/api/admin/auth/authenticate/route.ts)), and session management ([`app/api/admin/auth/session/route.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/api/admin/auth/session/route.ts)).
- [x] **Fingerprint Lock Overlay**: Created [`components/admin/fingerprint-lock.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/fingerprint-lock.tsx) with native OS biometric prompt invocation (`navigator.credentials.get`), device enrollment (`navigator.credentials.create`), master PIN fallback, and animated scanner UI.
- [x] **Admin Studio Route Protection**: Updated [`app/admin/page.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/admin/page.tsx) and [`app/admin/login/page.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/admin/login/page.tsx) to enforce session security and include a top navigation Lock/Logout action.

---

## 📈 Change Log & Progress Ledger
All significant changes and feature updates vibe coded by the AI agent should be logged here:

- **2026-08-25**:
  - Added Security & Passcode settings tab in Portfolio Admin Studio (`/admin`) for Master PIN management and biometric scanner enrollment.
  - Implemented PIN update API route at [`app/api/admin/auth/pin/route.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/api/admin/auth/pin/route.ts) with current PIN verification and session authentication checks.
  - Created [`SecuritySettings`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/security-settings.tsx) component allowing Master PIN updates and direct WebAuthn passkey enrollment.
  - Added Master PIN authorization step in [`FingerprintLock`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/fingerprint-lock.tsx) for registering additional biometric credentials when active credentials exist.

- **2026-08-23**:
  - Integrated WebAuthn Passkeys / Biometric Fingerprint lock for `/admin` studio, featuring Windows Hello, Touch ID, Android biometrics, and dynamic production domain (`rp.id`) resolution.
  - Built WebAuthn service layer ([`lib/webauthn-service.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/lib/webauthn-service.ts)) and API routes (`/api/admin/auth/register`, `/api/admin/auth/authenticate`, `/api/admin/auth/session`).
  - Created [`components/admin/fingerprint-lock.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/fingerprint-lock.tsx) biometric scanner overlay with Master PIN fallback option.
  - Created dedicated Login page at [`app/admin/login/page.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/admin/login/page.tsx) and updated [`app/admin/page.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/admin/page.tsx) with session verification & lock action.
  - Implemented Portfolio Admin Studio at [`/admin`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/admin/page.tsx) allowing full dynamic management (Add, Edit, Delete) for About Profile, Featured Engineering Projects, Experience Timeline, Technical Skills, and Social/Contact Channels.
  - Built modular admin editor components: [`AboutEditor`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/about-editor.tsx), [`ProjectsManager`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/projects-manager.tsx), [`ExperienceManager`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/experience-manager.tsx), [`SkillsManager`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/skills-manager.tsx), and [`ChannelsManager`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/admin/channels-manager.tsx).
  - Created JSON data store persistence layer at [`data/portfolio-store.json`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/data/portfolio-store.json) backed by [`lib/portfolio-service.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/lib/portfolio-service.ts) and Next.js App Router API route at [`app/api/portfolio/route.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/app/api/portfolio/route.ts).
  - Updated user-facing components ([`Hero`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/hero.tsx), [`Projects`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/projects.tsx), [`Experience`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/experience.tsx), [`Skills`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/skills.tsx), [`Contact`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/contact.tsx), [`Header`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/header.tsx), [`Footer`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/footer.tsx), and [`ProfileAvatar`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/profile-avatar.tsx)) to render live portfolio state.
  - Added custom social channel icons (YouTube, Twitter/X, Telegram, Discord, etc.) in [`components/icons.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/icons.tsx).
  - Built [`components/certifications.tsx`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/components/certifications.tsx) section displaying verified credentials, issuer badges, issue date, credential IDs, skill tags, and direct verification links.
  - Added `Certification` interface and `certificationsData` model to [`data/portfolio.ts`](file:///c:/nextjs-projects/ts/portfolio/aldenderf/data/portfolio.ts).
  - Integrated Certifications section into main page assembly and navigation links in Header and Footer.
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



