"use client";

/** Prev/next control for a snap carousel. Hidden below `sm`, where swiping is the natural gesture. */
export function CarouselArrow({
  side,
  label,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-700 opacity-0 shadow-md backdrop-blur transition-opacity hover:bg-white focus-visible:opacity-100 disabled:pointer-events-none disabled:opacity-0 group-hover:opacity-100 sm:block ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={side === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}
