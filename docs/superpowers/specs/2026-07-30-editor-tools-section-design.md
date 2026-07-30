# Editor Tools section — design

**Date:** 2026-07-30
**Status:** approved, implemented

## Problem

Franco built a Unity editor extension (Reparent) and wants it on the portfolio. It is not a
gameplay system, so it does not belong in the `gameSystems` grid: the existing card is a
1/3-width cell built around a muted video clip, and this piece has five UI screenshots and no
video. More editor tools are planned (2–4 over the coming months), so the structure has to hold
more than one item.

## Decisions

### Placement — third block inside `#games`

`GameDev.tsx` grows from two blocks to three: Featured Game → Gameplay Systems → Editor Tools.
No new nav entry, no new section id.

Rejected: a top-level `#tools` section. One item next to three gameplay systems and seven web
projects reads as padding, and the scroll-spy in `Navigation.tsx` would gain an entry that is
empty most of the time. Promoting it later is a two-line change if the tool count justifies it.

Naming: **"Editor Tools" / "Herramientas de Editor"**, not "Engine Tools". It is the industry
term for this class of work in both engines (Unity Editor scripting, Unreal Editor Utilities),
and "Engine Tools" invites the reading "tools for building engines".

### Layout — full-width rows, not a grid

Each tool is one full-width row: gallery on the left (3/5), text on the right (2/5), stacking to
a single column below `lg`.

The driver is legibility. These are editor UI screenshots with ~11px text. In a 3-column grid
cell (~380px) the hierarchy capture renders at ~60% scale and becomes unreadable — and the
interface *is* the entire argument for a tool. At 3/5 of `max-w-6xl` the gallery is ~660px, which
shows the ~600px-wide captures at 1:1.

Cost accepted: with 4 tools the section gets long. Comparable to what the featured game plus the
systems grid already occupy, and tools are the differentiating work. Revisit past ~6 tools.

Rejected: grid card opening a lightbox. Content behind a click is content most readers never see,
and here the five-step sequence *is* the substance.

### Gallery — one mechanism, scroll-snap

A `snap-x mandatory` scroll container with one slide per screenshot, driven by:

- **Thumbnail strip** of real `<button>`s calling `track.scrollTo({ left: clientWidth * i })`.
  Tab order and keyboard activation come free; no custom key handling.
- **Prev/next arrows** overlaid on `sm` and up, same call.
- **Active index from `IntersectionObserver`** rooted on the track (the pattern already used in
  `GameSystemCard.tsx`). Swipe, click and keyboard all converge on one source of truth.
- **Native swipe on mobile**, because it is native scroll. One code path for every viewport.
- **No autoplay.** A five-step technical sequence is read at the reader's pace.

Backdrop `#1e1e1e` (Unity's editor grey) with `object-contain`, so captures of different sizes do
not shift the layout.

**Images must never upscale.** Each shot carries its natural `width`/`height` and renders with
`w-auto h-auto max-w-full max-h-full`, so it displays at 1:1 or smaller. `next.config.ts` sets
`output: "export"` with `images.unoptimized: true`, so the files are served as authored: keep them
PNG (JPEG destroys UI text) and lazy-load everything after the first.

### Two galleries, one mechanism

The featured game later needed a carousel too, so the scroll-snap behaviour moved into
`useSnapCarousel` — track ref, active index, `goTo`. Only the behaviour is shared. The two
galleries look nothing alike on purpose:

| | Editor tools | Featured game |
|---|---|---|
| Fit | `contain` on the editor's grey, never upscaled | full-bleed `cover` |
| Navigation | thumbnails (each step looks distinct) | dots (frames of one game look alike at 64px) |
| Captions | required, one per step | optional, rendered only when present |

A horror game letterboxed on neutral grey reads like a bug report, not a game; editor UI cropped
to fill a frame loses the interface that is the whole point. Sharing the look would have been
worse than duplicating it.

### Data model

```ts
export type EngineKey = "unity" | "unreal";

export interface ToolShot {
  src: string;
  width: number;   // natural size — the gallery must not upscale UI text
  height: number;
  caption: Localized;
}

export interface EditorTool {
  id: string;
  title: string;
  engine: EngineKey;   // rendered as a badge, not decorative
  problem: Localized;  // shown in its own treatment above the description
  description: Localized;
  shots: ToolShot[];
  tags: string[];      // engine omitted — the badge already says it
  linkedinUrl?: string;
}
```

`problem` is a separate field rather than a first paragraph of `description` because "300 objects,
dragging was unworkable" is what makes the tool's existence legible, and splitting it forces every
future tool to have that answer.

Per-shot `caption` because the five screenshots are a narrative, not a set: problem → the injected
field → search → subsequence match and inline creation → result.

### Engine badge

`engine` existed on `GameSystem` and was never read by any component — a dead field. It is now
rendered, and the same badge is applied to the three gameplay system cards so the two blocks stay
consistent and the field stops being decoration.

Shown as an eyebrow above the title (icon + name, from the existing `TechIcons` map), so it is the
first thing read on the card. `Unity` is therefore dropped from `tags`, which would otherwise say
it twice and dilute the badge.

## Copy discipline

The copy was first written to claim only what the screenshots evidence: the injected Parent field,
full-path disambiguation, subsequence matching (`mscm` → `Mesa_Comedor`), inline parent creation,
the keep-world-position toggle, the confirmation footer. Behaviour that is plausible but invisible
in a still — Undo, multi-selection, shortcuts — was left out and then added only once Franco
confirmed it: `Ctrl+Z` undo, multi-object selection, `Ctrl+Shift+H`, and a right-click entry on the
object. Which UI framework backs it is still unstated, because it still isn't known.

Keep this rule for future tools: a still frame is evidence for what it shows and nothing else.

## Files

- `src/data/portfolio.ts` — `EngineKey`, `ToolShot`, `EditorTool`, `editorTools[]`
- `src/components/ui/EngineBadge.tsx` — new, shared
- `src/components/sections/ToolGallery.tsx` — new
- `src/components/sections/EditorToolCard.tsx` — new
- `src/components/sections/GameDev.tsx` — third block
- `src/components/sections/GameSystemCard.tsx` — engine badge
- `src/i18n/dictionaries.ts` — `games.toolsLabel`, `toolsSubtitle`, `toolProblem`, `galleryShot`,
  `galleryPrev`, `galleryNext` (en + es)
- `public/tools/reparent/1..5.png`
