"use client";

import Image from "next/image";
import type { GameShot } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import { useSnapCarousel } from "@/components/ui/useSnapCarousel";

/**
 * Game art, so the opposite treatment to ToolGallery: full-bleed cover instead of contained on
 * grey — a horror game letterboxed on a neutral backdrop reads like a bug report, not a game.
 * Dots instead of thumbnails, because screenshots of one game look alike at 64px and a thumbnail
 * strip would eat the frame the art needs.
 *
 * Captions are optional and render only when present.
 */
export function FeaturedGameGallery({ shots, title }: { shots: GameShot[]; title: string }) {
  const { t, pick } = useLanguage();
  const { trackRef, active, goTo } = useSnapCarousel(shots.length);
  const caption = shots[active]?.caption;

  return (
    // No `group` of its own: the arrows reveal on hovering the card, whose article carries it.
    <div className="absolute inset-0">
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((shot, index) => (
          <div key={shot.src} data-index={index} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={shot.src}
              alt={shot.caption ? `${title} — ${pick(shot.caption)}` : title}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
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

          {/* Bottom scrim carries both the dots and any caption, so neither depends on how bright
              the underlying frame happens to be. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent pt-10">
            {caption && (
              <p className="px-4 pb-2 text-sm leading-snug text-white/90">{pick(caption)}</p>
            )}
            <div className="pointer-events-auto flex justify-center gap-2 pb-4">
              {shots.map((shot, index) => (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${t.games.galleryShot} ${index + 1}`}
                  aria-current={index === active}
                  className={`h-2 rounded-full transition-all ${
                    index === active ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
