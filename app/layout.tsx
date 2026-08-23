import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alden Derf | Full-Stack Developer & Systems Builder",
  description:
    "Developer Portfolio of Alden Derf - Specializing in TypeScript, Next.js, and scalable database architectures. Bridging enterprise operational workflows with modern web engineering.",
  keywords: [
    "Alden Derf",
    "Full-Stack Developer",
    "Systems Builder",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Laravel",
    "PostgreSQL",
    "Prisma",
  ],
  authors: [{ name: "Alden Derf" }],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-200 selection:bg-zinc-200 dark:selection:bg-zinc-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
