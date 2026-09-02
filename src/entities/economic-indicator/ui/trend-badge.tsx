import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn, formatSignedChange } from "@/shared/lib/utils";
import type { TrendDirection } from "@/entities/economic-indicator/model/types";

interface TrendBadgeProps {
  trend: TrendDirection;
  change: number;
  unit?: string;
  /** When true, an upward trend is shown as negative (e.g. unemployment, trade deficit). */
  invert?: boolean;
  className?: string;
}

export function TrendBadge({ trend, change, unit = "", invert = false, className }: TrendBadgeProps) {
  const isGood = invert ? trend === "down" : trend === "up";
  const isBad = invert ? trend === "up" : trend === "down";

  const Icon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

  return (
    <span
      className={cn(
        "tabular-data inline-flex items-center gap-1 text-sm font-medium",
        isGood && "text-positive",
        isBad && "text-negative",
        trend === "flat" && "text-muted-foreground",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {formatSignedChange(change)}
      {unit}
    </span>
  );
}
