import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Eduard — Web Developer Portfolio",
  description:
    "Eduard is a web developer specializing in building exceptional digital experiences with modern technologies like React, Next.js, Tailwind and Prisma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-violet-500/30">
        {children}
      </body>
    </html>
  );
}
