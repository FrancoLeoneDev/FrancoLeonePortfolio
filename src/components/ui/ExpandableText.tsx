"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * A paragraph that starts clamped and opens on demand.
 *
 * The system and prototype descriptions carry the technical decision that makes
 * each card worth reading, so they are long by design — but ten of them at full
 * length turn the section into a wall. Clamping also levels the card heights in
 * the grid, which a mix of three-line and eight-line descriptions destroys.
 *
 * The toggle is hidden entirely when the text is short enough to fit, so a card
 * never shows a "read more" that opens two extra words.
 */
export function ExpandableText({
  text,
  lines = 3,
  threshold = 200,
  className = "",
}: {
  text: string;
  /** Clamped height, as a Tailwind line-clamp step. */
  lines?: 2 | 3 | 4;
  /** Below this many characters the text is shown whole, with no toggle. */
  threshold?: number;
  className?: string;
}) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const tooLong = text.length > threshold;
  const clamp = { 2: "line-clamp-2", 3: "line-clamp-3", 4: "line-clamp-4" }[lines];

  return (
    <motion.div layout className="overflow-hidden">
      <motion.p
        layout="position"
        className={`${className} ${!isExpanded && tooLong ? clamp : ""}`}
      >
        {text}
      </motion.p>

      {tooLong && (
        <motion.button
          layout="position"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="mt-1 text-xs font-medium text-primary-600 transition-colors hover:text-primary-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? t.common.showLess : t.common.readMore}
        </motion.button>
      )}
    </motion.div>
  );
}
