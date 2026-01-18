import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiPostgresql,
  SiSupabase,
  SiUnity,
  SiUnrealengine,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiLinux,
  SiNextdotjs,
  SiVercel,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { IconType } from "react-icons";

export const TechIcons: Record<string, IconType> = {
  // Frontend
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  TailwindCSS: SiTailwindcss,
  NextJS: SiNextdotjs,

  // Backend
  NodeJS: SiNodedotjs,
  Python: SiPython,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,

  // Game Development
  Unity: SiUnity,
  CSharp: TbBrandCSharp,
  UnrealEngine: SiUnrealengine,
  CPlusPlus: SiCplusplus,

  // Tools
  Docker: SiDocker,
  Git: SiGit,
  Linux: SiLinux,
  Vercel: SiVercel,
};

export type TechIconName = keyof typeof TechIcons;
