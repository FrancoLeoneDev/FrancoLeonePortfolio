"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GameSystem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
import { ResourceLink } from "@/components/ui/ResourceLink";

export function GameSystemCard({ system, index }: { system: GameSystem; index: number }) {
  const { pick } = useLanguage();
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
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
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
            alt={system.title}
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
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* h4: the block label above the grid is the h3. */}
        <h4 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {system.title}
        </h4>
        <p className="text-slate-600 text-sm mb-4">{pick(system.description)}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {system.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {system.linkedinUrl && (
          <div className="mt-auto">
            <ResourceLink kind="linkedin" href={system.linkedinUrl} />
          </div>
        )}
      </div>
    </motion.article>
  );
}
