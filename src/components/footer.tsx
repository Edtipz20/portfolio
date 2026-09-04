import type { SiteContent } from "@/lib/content";

export function Footer({ site }: { site: SiteContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-white/40 sm:flex-row lg:px-10">
        <p>{site.footer.copyright.replace("{year}", String(year))}</p>
        <p>{site.footer.signature}</p>
      </div>
    </footer>
  );
}
