"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { MediaItem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { useSnapCarousel } from "@/components/ui/useSnapCarousel";

/**
 * Mixed video-and-stills carousel for the networked prototypes. Two differences
 * from ToolGallery, both forced by the content:
 *
 * - The first slide is a clip, and it only plays while it is the slide you are
 *   looking at. A video playing behind three stills you scrolled to is noise.
 * - Slides are letterboxed on a dark ground at a fixed 16:9 instead of sized to
 *   the tallest shot: these captures range from a single window to a 2x2 grid of
 *   four clients, and a track that resized per slide would jump on every step.
 */
export function MultiplayerGallery({
  media,
  title,
}: {
  media: MediaItem[];
  title: string;
}) {
  const { t, pick } = useLanguage();
  const { trackRef, active, goTo } = useSnapCarousel(media.length);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Play only the active slide's clip. Pausing the rest also stops them decoding
  // frames off-screen, which is the whole reason the site ships preload="none".
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  return (
    <div className="min-w-0">
      <div className="group relative min-w-0 overflow-hidden rounded-xl border border-slate-200">
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
              ) : (
                <Image
                  src={item.src}
                  alt={`${title} — ${pick(item.caption)}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="!relative !h-full !w-full object-contain"
                />
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

      {media.length > 1 && (
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

      <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-slate-600 sm:min-h-[2.75rem]">
        <span className="mr-2 font-mono text-xs text-slate-400">
          {String(active + 1).padStart(2, "0")}
        </span>
        {pick(media[active].caption)}
      </p>
    </div>
  );
}
