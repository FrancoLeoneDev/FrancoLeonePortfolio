"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The "go look at this elsewhere" link that every game-dev card ends with.
 *
 * Centralised because the colour is meaningful and was drifting: repo links use
 * GitHub's violet so they read as "this is the code" instead of blending into
 * the site's blue, and everything else uses the site blue. Three cards had their
 * own copy of the markup, and the third copy got the colour wrong.
 */
export type ResourceKind = "github" | "linkedin" | "play" | "download";

const TONE: Record<ResourceKind, string> = {
  github: "text-github-600 hover:text-github-700",
  linkedin: "text-primary-600 hover:text-primary-700",
  play: "text-primary-600 hover:text-primary-700",
  download: "text-primary-600 hover:text-primary-700",
};

function Glyph({ kind }: { kind: ResourceKind }) {
  const common = "h-4 w-4";

  switch (kind) {
    case "github":
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={common} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      );
    case "download":
      return (
        <svg
          className={common}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
          />
        </svg>
      );
    case "play":
      return (
        <svg
          className={common}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <circle cx="12" cy="12" r="9" strokeWidth={2} />
        </svg>
      );
  }
}

export function ResourceLink({
  kind,
  href,
  /** Muted trailing detail, e.g. "Windows · 22 MB". Nobody should click a 22 MB download blind. */
  detail,
}: {
  kind: ResourceKind;
  href: string;
  detail?: string;
}) {
  const { t } = useLanguage();

  const label = {
    github: t.games.viewOnGithub,
    linkedin: t.games.viewOnLinkedin,
    play: t.games.playBuild,
    download: t.games.downloadBuild,
  }[kind];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium ${TONE[kind]}`}
    >
      <Glyph kind={kind} />
      {label}
      {detail && <span className="font-normal text-slate-400">{detail}</span>}
    </a>
  );
}
