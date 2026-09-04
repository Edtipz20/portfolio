"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectGallery({
  images,
  title,
  gradient,
}: {
  images: string[];
  title: string;
  gradient: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br",
          gradient,
        )}
      >
        <span className="text-sm text-white/40">No images yet</span>
      </div>
    );
  }

  function go(delta: number) {
    setActive((prev) => (prev + delta + images.length) % images.length);
  }

  return (
    <div>
      <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${title} screenshot ${index + 1}`}
            fill
            priority={index === 0}
            className={cn(
              "object-cover object-center transition-opacity duration-500 ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
            sizes="(min-width: 1024px) 800px, 100vw"
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/70 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/70 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1}`}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition-colors",
                index === active
                  ? "border-violet-400"
                  : "border-white/10 hover:border-white/30",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
