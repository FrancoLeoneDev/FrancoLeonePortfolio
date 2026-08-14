"use client";

import { motion } from "framer-motion";

export interface FilterOption {
  id: string;
  /** Mostly proper nouns (Unity, Memora), so usually not localized. */
  label: string;
  /** How many items this option matches. Shown so nobody clicks into an empty view. */
  count: number;
}

interface FilterChipsProps {
  options: FilterOption[];
  /** Empty array means "no filter", which is rendered as the "All" chip being active. */
  selected: string[];
  onChange: (next: string[]) => void;
  allLabel: string;
  totalCount: number;
  /** Names the group for screen readers — there is more than one filter row on the site. */
  ariaLabel: string;
}

/**
 * Opt-in filter row. The default state is "no filter", so a visitor who never
 * touches it sees every card — the filter can only ever be something they chose.
 *
 * Deselecting the last active chip lands back on the empty array, which is the
 * same state "All" represents, so the row can never end up showing nothing.
 * That is why there is no separate "clear" affordance: "All" is not a value in
 * `selected`, it is the absence of values.
 */
export function FilterChips({
  options,
  selected,
  onChange,
  allLabel,
  totalCount,
  ariaLabel,
}: FilterChipsProps) {
  const showingAll = selected.length === 0;

  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex flex-wrap justify-center gap-2 mb-10"
    >
      <Chip active={showingAll} onClick={() => onChange([])} label={allLabel} count={totalCount} />
      {options.map((option) => (
        <Chip
          key={option.id}
          active={selected.includes(option.id)}
          onClick={() => toggle(option.id)}
          label={option.label}
          count={option.count}
        />
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
      }`}
    >
      {label}
      <span className={`ml-2 tabular-nums text-xs ${active ? "text-slate-400" : "text-slate-400"}`}>
        {count}
      </span>
    </motion.button>
  );
}
