"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  caption?: string;
}

export default function ImageGallery({ images, caption }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  if (!images || images.length === 0) return null;

  // Single image display
  if (images.length === 1) {
    const img = images[0];
    return (
      <figure className="my-8 group relative overflow-hidden rounded-2xl border border-border/70 bg-card/40">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="block w-full text-start cursor-zoom-in relative focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={`View full image: ${img.alt || "image"}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            title={img.title}
            loading="lazy"
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md shadow">
              <ZoomIn className="h-3.5 w-3.5" />
              Zoom
            </span>
          </div>
        </button>
        {(img.alt || img.title || caption) && (
          <figcaption className="p-3 text-center text-xs text-muted-foreground border-t border-border/40">
            {img.title || img.alt || caption}
          </figcaption>
        )}

        {selectedIndex !== null && (
          <LightboxModal
            images={images}
            currentIndex={selectedIndex}
            onClose={closeLightbox}
            onPrev={showPrev}
            onNext={showNext}
            onSelect={setSelectedIndex}
          />
        )}
      </figure>
    );
  }

  // Multi-image gallery grid
  const gridColsClass =
    images.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : images.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : images.length === 4
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

  return (
    <div className="my-8">
      <div
        className={`grid ${gridColsClass} gap-3 sm:gap-4 p-3 rounded-2xl border border-border/70 bg-card/40`}
      >
        {images.map((img, idx) => (
          <button
            key={`${img.src}-${idx}`}
            type="button"
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 cursor-zoom-in transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={`View image ${idx + 1} of ${images.length}: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              title={img.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3 pointer-events-none">
              <span className="line-clamp-1 text-left text-[11px] font-medium text-white drop-shadow">
                {img.title || img.alt || `Image ${idx + 1}`}
              </span>
            </div>
            <div className="absolute top-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-white/90 backdrop-blur-sm">
              {idx + 1}/{images.length}
            </div>
          </button>
        ))}
      </div>
      {caption && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </p>
      )}

      {selectedIndex !== null && (
        <LightboxModal
          images={images}
          currentIndex={selectedIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
          onSelect={setSelectedIndex}
        />
      )}
    </div>
  );
}

function LightboxModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  const currentImg = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 select-none animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-10">
        <span className="text-xs sm:text-sm font-medium tracking-wide bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-black/40 p-2 text-white/80 hover:text-white hover:bg-black/70 border border-white/10 backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close image preview"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex flex-col items-center justify-center max-h-[85vh] max-w-[92vw]">
        <img
          src={currentImg.src}
          alt={currentImg.alt}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-200"
        />
        {(currentImg.title || currentImg.alt) && (
          <p className="mt-3 text-center text-xs sm:text-sm text-white/90 max-w-2xl px-4 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm">
            {currentImg.title || currentImg.alt}
          </p>
        )}
      </div>

      {/* Prev/Next Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 sm:p-3 text-white/80 hover:text-white hover:bg-black/80 border border-white/10 backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 sm:p-3 text-white/80 hover:text-white hover:bg-black/80 border border-white/10 backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Thumbnail Bar */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center px-4 overflow-x-auto gap-2 py-2 max-w-4xl mx-auto scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={`thumb-${img.src}-${idx}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(idx);
                }}
                className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  idx === currentIndex
                    ? "border-primary scale-105 shadow-md shadow-primary/20"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
