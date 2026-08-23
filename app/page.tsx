import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}
