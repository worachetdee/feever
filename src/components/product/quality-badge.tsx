import { BadgeCheck, Award, Crown } from "lucide-react";
import { QUALITY_TIERS } from "@/lib/utils/constants";
import type { QualityTier } from "@/types";

interface QualityBadgeProps {
  tier: QualityTier;
}

const tierIcons: Record<QualityTier, typeof BadgeCheck> = {
  unverified: BadgeCheck,
  verified: BadgeCheck,
  pick: Award,
  gold: Crown,
};

const tierStyles: Record<QualityTier, string> = {
  unverified: "bg-muted text-muted-foreground ring-border",
  verified: "bg-primary/10 text-primary/80 ring-primary/20",
  pick: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
  gold: "bg-yellow-500/10 text-yellow-600 ring-yellow-500/20 dark:text-yellow-400",
};

export function QualityBadge({ tier }: QualityBadgeProps) {
  if (tier === "unverified") return null;

  const Icon = tierIcons[tier];
  const info = QUALITY_TIERS[tier];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${tierStyles[tier]}`}
    >
      <Icon className="size-3" />
      {info.label}
    </span>
  );
}
