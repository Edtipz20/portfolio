/**
 * Content layer
 * -----------------------------------------------------------------------
 * Every section of the site pulls its copy from here instead of hard
 * coding strings in components. Right now the data lives in local JSON
 * files under `src/content`, which behaves like a tiny headless CMS:
 * non-developers can edit those files directly, or a build/CI step can
 * regenerate them.
 *
 * To connect a real CMS (Sanity, Contentful, Payload, Notion, etc.) later,
 * you only need to change the function bodies below - swap the JSON
 * import for a `fetch()`/SDK call that returns data shaped like the types
 * exported here. No component needs to change.
 */

import siteJson from "@/content/site.json";
import statsJson from "@/content/stats.json";
import skillsJson from "@/content/skills.json";
import techStackJson from "@/content/tech-stack.json";
import projectsJson from "@/content/projects.json";
import testimonialJson from "@/content/testimonial.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface SiteContent {
  brand: { name: string; logoInitial: string };
  nav: NavLink[];
  hero: {
    eyebrow: string;
    firstName: string;
    headline: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    techNote: string;
    codeSnippet: { title: string; lines: string[] };
  };
  about: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: CtaLink;
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: CtaLink;
    email: string;
    phone: string;
  };
  social: { platform: string; href: string }[];
  footer: { copyright: string; signature: string };
}

export interface Stat {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
}

export interface TechStackItem {
  id: string;
  icon: string;
}

export interface Project {
  id: string;
  order: number;
  title: string;
  description: string;
  tag: string;
  gradient: string;
  href: string;
  images: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export function getSiteContent(): SiteContent {
  return siteJson as SiteContent;
}

export function getStats(): Stat[] {
  return statsJson as Stat[];
}

export function getSkills(): Skill[] {
  return skillsJson as Skill[];
}

export function getTechStack(): TechStackItem[] {
  return techStackJson as TechStackItem[];
}

export function getProjects(): Project[] {
  return (projectsJson as Project[]).slice().sort((a, b) => a.order - b.order);
}

export function getTestimonial(): Testimonial {
  return testimonialJson as Testimonial;
}
