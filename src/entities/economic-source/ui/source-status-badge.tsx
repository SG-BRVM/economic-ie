import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/use-translation";
import type { SourceStatus } from "@/entities/economic-source/model/types";

const STATUS_KEY: Record<SourceStatus, string> = {
  active: "sourceStatus.active",
  degraded: "sourceStatus.degraded",
  inactive: "sourceStatus.inactive",
};

const STATUS_DOT: Record<SourceStatus, string> = {
  active: "bg-positive",
  degraded: "bg-warning",
  inactive: "bg-negative",
};

const STATUS_VARIANT: Record<SourceStatus, "positive" | "warning" | "negative"> = {
  active: "positive",
  degraded: "warning",
  inactive: "negative",
};

export function SourceStatusBadge({ status }: { status: SourceStatus }) {
  const { t } = useTranslation();
  return (
    <Badge variant={STATUS_VARIANT[status]}>
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
      {t(STATUS_KEY[status])}
    </Badge>
  );
}
