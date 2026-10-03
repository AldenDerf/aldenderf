import { getPortfolioData } from "@/lib/portfolio-service";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";

export const dynamic = "force-dynamic";

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: "https://aldenderf.com/",
  mainEntity: {
    "@type": "Person",
    name: "Alden Derf Fabro",
    alternateName: "Alden Derf",
    url: "https://aldenderf.com/",
    jobTitle: ["Software Engineer", "Full-Stack Developer"],
    description: "Ivatan software engineer and full-stack developer from Batanes, Philippines.",
    homeLocation: { "@type": "Place", name: "Batanes, Philippines" },
    sameAs: [
      "https://github.com/aldenderf",
      "https://www.linkedin.com/in/alden-derf/",
    ],
  },
};

export default function Home() {
  const data = getPortfolioData();

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage).replace(/</g, "\\u003c") }}
      />
      <Hero profile={data.profile} channels={data.channels} />
      <Projects items={data.projects} />
      <Experience items={data.experience} />
      <Skills categories={data.skills} />
      <Certifications items={data.certifications} />
      <Contact profile={data.profile} channels={data.channels} />
    </div>
  );
}
