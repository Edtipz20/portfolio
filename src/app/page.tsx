import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import {
  getSiteContent,
  getStats,
  getSkills,
  getTechStack,
  getTestimonial,
} from "@/lib/content";

export default async function Home() {
  const site = getSiteContent();
  const stats = getStats();
  const skills = getSkills();
  const techStack = getTechStack();
  const testimonial = getTestimonial();

  return (
    <>
      <Navbar site={site} />
      <main>
        <Hero site={site} techStack={techStack} />
        <About site={site} stats={stats} />
        <SkillsSection skills={skills} />
        <ProjectsSection />
        <ContactSection site={site} testimonial={testimonial} />
      </main>
      <Footer site={site} />
    </>
  );
}
