"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { MediaLightbox } from "@/components/ui/MediaLightbox";
import { playFullscreen } from "@/components/ui/playFullscreen";
import { useSnapCarousel } from "@/components/ui/useSnapCarousel";

/**
 * Mixed video-and-stills carousel, used by the networked prototypes and the debug
 * tools. Two differences from ToolGallery, both forced by the content:
 *
 * - The first slide is a clip, and it only plays while it is the slide you are
 *   looking at. A video playing behind three stills you scrolled to is noise.
 * - Slides are letterboxed on a dark ground at a fixed 16:9 instead of sized to
 *   the tallest shot: these captures range from a zoomed editor menu to a 2x2 grid
 *   of four clients, and a track that resized per slide would jump on every step.
 */
export function MediaGallery({
  media,
  title,
  /**
   * Grid-cell sizing: the thumbnail strip becomes dots and the caption drops to
   * one line. A 64px thumbnail inside a 340px card is smaller than the arrow that
   * would do the same job.
   */
  compact = false,
}: {
  media: MediaItem[];
  title: string;
  compact?: boolean;
}) {
  const { t, pick } = useLanguage();
  const { trackRef, active, goTo } = useSnapCarousel(media.length);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxItem = lightboxIndex === null ? null : media[lightboxIndex];

  // Play only the active slide's clip. Pausing the rest also stops them decoding
  // frames off-screen, which is the whole reason the site ships preload="none".
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && lightboxIndex === null) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, lightboxIndex]);

  return (
    <div className="min-w-0">
      {/* Compact drops the frame so the media can sit flush against the card's own
          rounded edge — inside a grid cell, a border plus card padding shrinks the
          picture below the size of the gameplay-system cards next to it. */}
      <div
        className={`group relative min-w-0 overflow-hidden ${
          compact ? "" : "rounded-xl border border-slate-200"
        }`}
      >
        <div
          ref={trackRef}
          className="flex aspect-video snap-x snap-mandatory overflow-x-auto bg-slate-900 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {media.map((item, index) => (
            <div
              key={item.src}
              data-index={index}
              className="flex w-full shrink-0 snap-center items-center justify-center"
            >
              {item.type === "video" ? (
                <button
                  type="button"
                  onClick={() => playFullscreen(videoRefs.current[index])}
                  aria-label={`${title} — ${t.common.enlarge}`}
                  className="group/clip relative h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    className="h-full w-full object-contain"
                    poster={item.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover/clip:opacity-100">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${title} — ${t.common.enlarge}`}
                  className="group/shot relative h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
                >
                  <Image
                    src={item.src}
                    alt={`${title} — ${pick(item.caption)}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="!relative !h-full !w-full object-contain"
                  />
                  <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover/shot:opacity-100">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                      />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        {media.length > 1 && (
          <>
            <CarouselArrow
              side="left"
              label={t.games.galleryPrev}
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            />
            <CarouselArrow
              side="right"
              label={t.games.galleryNext}
              disabled={active === media.length - 1}
              onClick={() => goTo(active + 1)}
            />
          </>
        )}
      </div>

      {media.length > 1 && compact && (
        <div className="mt-2 flex justify-center gap-1.5 px-5">
          {media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${t.games.galleryShot} ${index + 1}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all ${
                index === active
                  ? "w-5 bg-primary-500"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}

      {media.length > 1 && !compact && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${t.games.galleryShot} ${index + 1}`}
              aria-current={index === active}
              className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-slate-900 transition-colors sm:h-11 sm:w-16 ${
                index === active
                  ? "border-primary-500"
                  : "border-transparent opacity-60 hover:border-slate-300 hover:opacity-100"
              }`}
            >
              {/* A video's thumbnail is its poster — the clip itself never loads here. */}
              <Image
                src={item.type === "video" ? (item.poster ?? item.src) : item.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <p
        className={
          compact
            ? "mt-2 min-h-[2.5rem] px-5 text-xs leading-relaxed text-slate-500"
            : "mt-3 min-h-[3.5rem] text-sm leading-relaxed text-slate-600 sm:min-h-[2.75rem]"
        }
      >
        {!compact && (
          <span className="mr-2 font-mono text-xs text-slate-400">
            {String(active + 1).padStart(2, "0")}
          </span>
        )}
        {pick(media[active].caption)}
      </p>

      <MediaLightbox
        open={lightboxItem !== null}
        kind={lightboxItem?.type ?? "video"}
        src={lightboxItem?.src ?? ""}
        poster={lightboxItem?.poster}
        title={title}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
