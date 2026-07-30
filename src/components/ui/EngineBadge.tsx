import { TechIcons } from "@/components/icons/TechIcons";
import type { EngineKey } from "@/data/portfolio";

const ENGINES: Record<EngineKey, { label: string; iconKey: string }> = {
  unity: { label: "Unity", iconKey: "Unity" },
  unreal: { label: "Unreal Engine", iconKey: "UnrealEngine" },
};

/**
 * Names the engine a piece of work was built in. Sits above the title rather than among the
 * tags, so it reads first — which is why the engine name is dropped from `tags` everywhere
 * this is used. Pass `className` to restyle for a dark backdrop (see GameSystemCard).
 */
export function EngineBadge({
  engine,
  className = "",
}: {
  engine: EngineKey;
  className?: string;
}) {
  const { label, iconKey } = ENGINES[engine];
  const Icon = TechIcons[iconKey];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700 ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
    </span>
  );
}
