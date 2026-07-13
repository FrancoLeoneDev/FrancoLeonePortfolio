"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GameSystem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";

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
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {system.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4">{pick(system.description)}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {system.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {system.linkedinUrl && (
          <a
            href={system.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
            {t.games.viewOnLinkedin}
          </a>
        )}
      </div>
    </motion.article>
  );
}
