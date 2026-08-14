import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiFramer,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiUnity,
  SiUnrealengine,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiN8N,
  SiLinux,
  SiNextdotjs,
  SiVercel,
} from "react-icons/si";
import { TbBrandCSharp, TbTopologyStar } from "react-icons/tb";
import { IconType } from "react-icons";

export const TechIcons: Record<string, IconType> = {
  // Frontend
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  TailwindCSS: SiTailwindcss,
  FramerMotion: SiFramer,
  NextJS: SiNextdotjs,
  Vue: SiVuedotjs,

  // Backend
  NodeJS: SiNodedotjs,
  Python: SiPython,
  PHP: SiPhp,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Supabase: SiSupabase,

  // Game Development
  Unity: SiUnity,
  CSharp: TbBrandCSharp,
  UnrealEngine: SiUnrealengine,
  CPlusPlus: SiCplusplus,
  // A topology glyph, not Photon's brand mark: Simple Icons ships a "Photon" logo
  // but it is not confirmed to be Photon Engine, and a wrong logo is worse than none.
  PhotonFusion: TbTopologyStar,

  // Tools
  Docker: SiDocker,
  Git: SiGit,
  GitHubActions: SiGithubactions,
  N8N: SiN8N,
  Linux: SiLinux,
  Vercel: SiVercel,
};

export type TechIconName = keyof typeof TechIcons;
