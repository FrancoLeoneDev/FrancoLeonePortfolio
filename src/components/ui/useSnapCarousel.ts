"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives a horizontal scroll-snap track: the container is the single source of truth, and the
 * active index comes back from an observer watching the slides. Buttons only scroll it, so swipe,
 * click and keyboard all converge on one code path — and native swipe comes free on touch.
 *
 * Shared by the tool gallery and the featured game gallery. Only the behaviour is shared; the two
 * look nothing alike (contain-on-grey with captions vs. full-bleed cover), and that's on purpose.
 *
 * Pass `autoplayMs` to have it advance on its own. It only runs while the track is on screen and
 * `hold` is off, and it wraps at the end — a self-advancing gallery that stops dead on the last
 * frame reads as broken, not as finished. The timer restarts on every index change, so clicking
 * an arrow or swiping also buys a full interval before the next automatic move.
 */
export function useSnapCarousel(count: number, autoplayMs = 0) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Three independent reasons to sit still, and they have to stay independent: one shared flag
  // meant the pointer leaving also cancelled the pause that keyboard focus had asked for.
  const [pointerOn, setPointerOn] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const held = pointerOn || focusOn;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      { root: track, threshold: 0.6 }
    );

    for (const slide of Array.from(track.children)) observer.observe(slide);
    return () => observer.disconnect();
  }, [count]);

  // Every slide is exactly the track's width, so the offset is a plain multiple. Scrolling the
  // container (rather than scrollIntoView) keeps the page itself from jumping.
  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    track.scrollTo({ left: track.clientWidth * clamped, behavior: "smooth" });
  }, [count]);

  // Autoplaying off screen would pull in every lazy frame and scroll a track nobody is looking
  // at, so the timer only exists while the gallery is actually in view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !autoplayMs) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, [autoplayMs]);

  useEffect(() => {
    if (!autoplayMs || count < 2 || held || !onScreen) return;
    // Motion nobody asked for is exactly what this setting is about.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => goTo((active + 1) % count), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [autoplayMs, count, held, onScreen, active, goTo]);

  // Spread on whatever wraps the whole gallery — the arrows and dots included, so hovering an
  // arrow doesn't count as leaving. Focus counts too: someone tabbing through the dots deserves
  // the same pause as someone hovering.
  const hold = {
    onPointerEnter: () => setPointerOn(true),
    onPointerLeave: () => setPointerOn(false),
    onFocus: () => setFocusOn(true),
    onBlur: () => setFocusOn(false),
  };

  return { trackRef, active, goTo, hold };
}
