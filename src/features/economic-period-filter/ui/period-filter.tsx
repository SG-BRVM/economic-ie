import { cn } from "@/shared/lib/utils";
import type { ObservationPeriod } from "@/entities/economic-observation/model/types";

const PERIODS: ObservationPeriod[] = ["1M", "3M", "6M", "1Y", "5Y", "MAX"];

interface PeriodFilterProps {
  value: ObservationPeriod;
  onChange: (period: ObservationPeriod) => void;
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="inline-flex items-center rounded-md bg-secondary p-1">
      {PERIODS.map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => onChange(period)}
          className={cn(
            "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
            value === period
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
