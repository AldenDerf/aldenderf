import { getPortfolioData } from "@/lib/portfolio-service";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getPortfolioData();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero profile={data.profile} channels={data.channels} />
      <Projects items={data.projects} />
      <Experience items={data.experience} />
      <Skills categories={data.skills} />
      <Certifications items={data.certifications} />
      <Contact profile={data.profile} channels={data.channels} />
    </div>
  );
}
