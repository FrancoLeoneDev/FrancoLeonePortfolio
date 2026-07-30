"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives a horizontal scroll-snap track: the container is the single source of truth, and the
 * active index comes back from an observer watching the slides. Buttons only scroll it, so swipe,
 * click and keyboard all converge on one code path — and native swipe comes free on touch.
 *
 * Shared by the tool gallery and the featured game gallery. Only the behaviour is shared; the two
 * look nothing alike (contain-on-grey with captions vs. full-bleed cover), and that's on purpose.
 */
export function useSnapCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    track.scrollTo({ left: track.clientWidth * clamped, behavior: "smooth" });
  };

  return { trackRef, active, goTo };
}
