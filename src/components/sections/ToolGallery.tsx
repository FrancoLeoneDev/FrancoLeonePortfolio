"use client";

import Image from "next/image";
import type { ToolShot } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { useSnapCarousel } from "@/components/ui/useSnapCarousel";

/**
 * Walks through a tool's screenshots as a narrated sequence. Editor UI, so: contained on the
 * editor's own grey, never upscaled, one caption per step, thumbnails because each step looks
 * distinct enough to navigate by.
 *
 * There is deliberately no autoplay. These are technical steps, read at the reader's pace.
 */
export function ToolGallery({ shots, title }: { shots: ToolShot[]; title: string }) {
  const { t, pick } = useLanguage();
  const { trackRef, active, goTo } = useSnapCarousel(shots.length);

  return (
    // min-w-0 throughout: the thumbnail strip is wider than a phone, and without this its
    // min-content width would push the whole card past the viewport.
    <div className="min-w-0">
      <div className="group relative min-w-0 overflow-hidden rounded-xl border border-slate-200">
        <div
          ref={trackRef}
          className="flex h-[260px] snap-x snap-mandatory overflow-x-auto bg-[#1e1e1e] sm:h-[360px] lg:h-[460px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((shot, index) => (
            <div
              key={shot.src}
              data-index={index}
              className="flex w-full shrink-0 snap-center items-center justify-center p-3 sm:p-5"
            >
              {/* w-auto/h-auto with the natural width+height means this never scales up — editor
                  UI text is unreadable the moment it does. */}
              <Image
                src={shot.src}
                alt={`${title} — ${pick(shot.caption)}`}
                width={shot.width}
                height={shot.height}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-auto max-h-full w-auto max-w-full rounded-sm object-contain"
              />
            </div>
          ))}
        </div>

        {shots.length > 1 && (
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
              disabled={active === shots.length - 1}
              onClick={() => goTo(active + 1)}
            />
          </>
        )}
      </div>

      {shots.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${t.games.galleryShot} ${index + 1}`}
              aria-current={index === active}
              className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-[#1e1e1e] transition-colors sm:h-11 sm:w-16 ${
                index === active
                  ? "border-primary-500"
                  : "border-transparent opacity-60 hover:border-slate-300 hover:opacity-100"
              }`}
            >
              <Image src={shot.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fixed min-height so stepping through captions of different lengths doesn't shift the row. */}
      <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-slate-600 sm:min-h-[2.75rem]">
        <span className="mr-2 font-mono text-xs text-slate-400">
          {String(active + 1).padStart(2, "0")}
        </span>
        {pick(shots[active].caption)}
      </p>
    </div>
  );
}
