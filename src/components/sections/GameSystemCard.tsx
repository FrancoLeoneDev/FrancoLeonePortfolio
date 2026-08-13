"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GameSystem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
import { ExpandableText } from "@/components/ui/ExpandableText";
import { playFullscreen } from "@/components/ui/playFullscreen";
import { ResourceLink } from "@/components/ui/ResourceLink";

export function GameSystemCard({ system, index }: { system: GameSystem; index: number }) {
  const { t, pick } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    // The id makes each system linkable on its own — the in-development band points
    // at one of these. scroll-mt clears the fixed navbar.
    <motion.article
      id={system.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative scroll-mt-24 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
    >
      {/* Media */}
      <div className="relative h-48 md:h-52 bg-slate-900 overflow-hidden">
        {system.video ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={system.poster}
            muted
            loop
            playsInline
            preload="none"
          >
            <source src={system.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={system.poster}
            alt={pick(system.title)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {/* Several clips have their own UI burned into the frame near the top ("Large Item",
            "Cubo prueba"). This keeps the badge legible instead of colliding with it. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Overlaid rather than in the content block: these cards are already dense, and the
            badge costs no vertical space here. */}
        <EngineBadge
          engine={system.engine}
          className="absolute left-3 top-3 z-10 border-white/30 bg-white/85 shadow-sm backdrop-blur"
        />

        {/* Which game it ships in, opposite the engine badge. Same treatment as the
            topology badge on the multiplayer cards: a fact about the work, not a
            technology, so it stays out of the tag row below. */}
        {system.project && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/30 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            {system.project}
          </span>
        )}

        {/* Covers the whole frame so the clip itself is the target. Only the icon is
            painted, and only on hover — a permanent overlay would fight the clip. */}
        {system.video && (
          <button
            type="button"
            onClick={() => playFullscreen(videoRef.current)}
            aria-label={`${pick(system.title)} — ${t.common.enlarge}`}
            className="absolute inset-0 z-10 flex items-end justify-end p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
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

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* h4: the block label above the grid is the h3. */}
        <h4 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {pick(system.title)}
        </h4>
        <div className="mb-4">
          <ExpandableText
            text={pick(system.description)}
            lines={3}
            className="text-slate-600 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {system.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Same row treatment as the debug-tool cards: a system can carry both the
            repo and the write-up, and they belong side by side at the foot of the
            card rather than stacked. mt-auto keeps the row pinned to the bottom so
            it lines up across a grid of cards with different description lengths. */}
        {(system.githubUrl || system.linkedinUrl) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
            {system.githubUrl && <ResourceLink kind="github" href={system.githubUrl} />}
            {system.linkedinUrl && <ResourceLink kind="linkedin" href={system.linkedinUrl} />}
          </div>
        )}
      </div>
    </motion.article>
  );
}
