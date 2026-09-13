import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitTags(tag: string): string[] {
  return tag
    .split("+")
    .map((t) => t.trim())
    .filter(Boolean);
}
