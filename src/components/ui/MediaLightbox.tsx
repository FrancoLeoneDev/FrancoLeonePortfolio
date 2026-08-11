"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Full-screen view for media that is unreadable at card size.
 *
 * Everything here is captured at 1280–1600px and lands in a ~350px card, so the
 * detail — item grids, editor handles labelled "entra acá (0,220 m)", four client
 * windows — is decoration until it can be opened. Images matter as much as clips:
 * a tool argued through a Scene view screenshot is illegible in a grid cell, and
 * without this it would have no way out of it.
 *
 * Closes on Escape and on a backdrop click, locks body scroll while open, and
 * moves focus to the close button so a keyboard user is not left behind on the
 * page underneath.
 */
export function MediaLightbox({
  open,
  kind = "video",
  src,
  poster,
  title,
  onClose,
}: {
  open: boolean;
  kind?: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Restored on close: leaving the page locked after an unmount is the classic
    // modal bug, and it strands the visitor at whatever scroll position they had.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!isMounted) return null;

  // Rendered into <body> rather than in place. The cards animate on hover, so they
  // carry a transform, and a transformed ancestor becomes the containing block for
  // `position: fixed` — in place, this overlay covers the card instead of the page.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            // Clicks inside must not reach the backdrop, or using the scrubber
            // would close the dialog.
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-5xl"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white/90">{title}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t.common.close}
                className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {kind === "video" ? (
              <video
                className="max-h-[80vh] w-full rounded-xl bg-black"
                src={src}
                poster={poster}
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              // Plain <img>: the static export serves these unoptimized anyway, and
              // next/image would need the intrinsic size the data does not carry.
              // eslint-disable-next-line @next/next/no-img-element
              // w-auto, not w-full: several of these are small crisp editor windows,
              // and stretching a 539px screenshot across 1024 turns its 11px text to
              // mush — the opposite of why it was opened.
              <img
                className="mx-auto max-h-[80vh] w-auto max-w-full rounded-xl"
                src={src}
                alt={title}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
