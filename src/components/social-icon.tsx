import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  twitter: (
    <path d="M22 4.01c-.9.4-1.8.7-2.8.9 1-.6 1.8-1.6 2.2-2.7-.9.6-2 1-3.1 1.2A4.8 4.8 0 0 0 16.4 2c-2.7 0-4.8 2.2-4.8 4.8 0 .4 0 .7.1 1.1-4-.2-7.6-2.1-10-5-.4.7-.6 1.6-.6 2.5 0 1.6.8 3.1 2.1 3.9-.8 0-1.5-.2-2.1-.6v.1c0 2.3 1.6 4.3 3.8 4.7-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.5 3.3A9.6 9.6 0 0 1 0 19.5 13.5 13.5 0 0 0 7.3 21.6c8.8 0 13.6-7.3 13.6-13.6v-.6c.9-.7 1.7-1.5 2.3-2.5-.9.4-1.8.6-2.8.7Z" />
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.4a4 4 0 1 1-3.4-3.4 4 4 0 0 1 3.4 3.4Z" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
};

export function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  const icon = ICONS[platform];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
    >
      {icon}
    </svg>
  );
}
