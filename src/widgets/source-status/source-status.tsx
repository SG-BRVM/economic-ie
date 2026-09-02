import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { useSources } from "@/entities/economic-source/api/queries";
import { SourceStatusBadge } from "@/entities/economic-source/ui/source-status-badge";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function SourceStatus() {
  const { data: sources, isLoading } = useSources();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sourceStatus.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}
        {!isLoading &&
          sources?.map((source) => (
            <div key={source.id} className="flex items-center justify-between text-sm">
              <span className="font-medium">{source.name}</span>
              <SourceStatusBadge status={source.status} />
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
