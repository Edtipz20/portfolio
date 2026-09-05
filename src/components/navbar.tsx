"use client";

import { useEffect, useState } from "react";
import { CodeXml, Menu, X } from "lucide-react";
import { ContactFormDialog } from "@/components/contact-form-dialog";
import type { SiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar({ site }: { site: SiteContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(site.nav[0]?.href ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = site.nav
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [site.nav]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-background/85 backdrop-blur-lg"
          : "border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#home"
          className="flex items-center gap-2 font-display text-lg font-bold"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-500 text-white">
            <CodeXml className="h-4.5 w-4.5" strokeWidth={2.5} />
          </span>
          {site.brand.name}
        </a>

        <ul className="hidden items-center gap-9 text-sm font-medium text-white/70 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "relative pb-1 transition-colors hover:text-white",
                  item.href === activeHref &&
                    "text-white after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-violet-500",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ContactFormDialog recipient={site.contact.email} />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-background px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-white/80">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(item.href === activeHref && "text-white")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ContactFormDialog
            recipient={site.contact.email}
            className="mt-5"
            fullWidth
          />
        </div>
      )}
    </header>
  );
}
