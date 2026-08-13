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
 *
 * It advances on its own: this is the one place on the page big enough that a still frame wastes
 * it, and a visitor who never touches the arrows still gets to see the game. Hovering stops it —
 * the moment someone is actually looking at a frame is the worst moment to take it away.
 */
const AUTOPLAY_MS = 5000;

export function FeaturedGameGallery({ shots, title }: { shots: GameShot[]; title: string }) {
  const { t, pick } = useLanguage();
  const { trackRef, active, goTo, hold } = useSnapCarousel(shots.length, AUTOPLAY_MS);
  const caption = shots[active]?.caption;

  return (
    // No `group` of its own: the arrows reveal on hovering the card, whose article carries it.
    <div className="absolute inset-0" {...hold}>
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* `overflow-hidden` per slide, not just on the track: the hover zoom below scales each
            image about its centre, so without it the neighbouring frame spills a couple of dozen
            pixels into this one along the seam. */}
        {shots.map((shot, index) => (
          <div
            key={shot.src}
            data-index={index}
            className="relative h-full w-full shrink-0 snap-center overflow-hidden"
          >
            <Image
              src={shot.src}
              alt={shot.caption ? `${title} — ${pick(shot.caption)}` : title}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              // The card spans the section now, so the frame is the full column at every width.
              sizes="(max-width: 1152px) 100vw, 1104px"
            />
          </div>
        ))}
      </div>

      {shots.length > 1 && (
        <>
          {/* Both arrows wrap and neither is ever disabled: the gallery already loops on its
              own, so an arrow that dead-ends on the last frame would contradict what the
              visitor just watched it do. */}
          <CarouselArrow
            side="left"
            label={t.games.galleryPrev}
            onClick={() => goTo((active - 1 + shots.length) % shots.length)}
          />
          <CarouselArrow
            side="right"
            label={t.games.galleryNext}
            onClick={() => goTo((active + 1) % shots.length)}
          />

          {/* Position, spelled out. Nine frames is more than the dots read at a glance, and it
              tells someone who just landed that there is a lot more game behind this one. */}
          <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium tabular-nums text-white/90 backdrop-blur-sm">
            {active + 1} / {shots.length}
          </div>

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
