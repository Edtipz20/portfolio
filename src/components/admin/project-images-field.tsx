"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

const MAX_IMAGES = 5;

export function ProjectImagesField({
  name = "images",
  defaultImages = [],
}: {
  name?: string;
  defaultImages?: string[];
}) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [error, setError] = useState<string | null>(null);

  const { startUpload, isUploading } = useUploadThing("projectImages", {
    onClientUploadComplete: (res) => {
      setError(null);
      setImages((prev) =>
        [...prev, ...res.map((file) => file.url)].slice(0, MAX_IMAGES),
      );
    },
    onUploadError: (uploadError) => {
      setError(uploadError.message);
    },
  });

  const remainingSlots = MAX_IMAGES - images.length;

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    if (files.length > remainingSlots) {
      setError(
        `You can only add ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"}.`,
      );
      event.target.value = "";
      return;
    }

    setError(null);
    startUpload(files);
    event.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((image) => image !== url));
  }

  return (
    <div>
      {/* This is what actually reaches the server action — the uploader
          itself talks to UploadThing directly and only ever produces URLs. */}
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      <div className="flex flex-wrap gap-3">
        {images.map((url) => (
          <div
            key={url}
            className="group relative h-24 w-24 overflow-hidden rounded-lg border border-white/15"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {remainingSlots > 0 && (
          <label
            className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-white/20 text-white/40 transition-colors hover:border-white/40 hover:text-white/70 ${
              isUploading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <Upload className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[11px]">
              {isUploading ? "Uploading…" : "Add"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      <p className="mt-2 text-xs text-white/40">
        {images.length}/{MAX_IMAGES} images
      </p>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
