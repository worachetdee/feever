import { COMPATIBILITY_TAGS } from "@/lib/utils/constants";
import type { CompatibilityTag } from "@/types";

interface CompatibilityBadgesProps {
  tags: CompatibilityTag[];
  max?: number;
}

export function CompatibilityBadges({ tags, max }: CompatibilityBadgesProps) {
  const visible = max ? tags.slice(0, max) : tags;
  const remaining = max ? tags.length - max : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag) => {
        const info = COMPATIBILITY_TAGS[tag];
        return (
          <span
            key={tag}
            className="rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {info?.label ?? tag}
          </span>
        );
      })}
      {remaining > 0 && (
        <span className="rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          +{remaining} more
        </span>
      )}
    </div>
  );
}
