import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Badge } from "@/shared/ui/badge";
import { useLatestAnalysis } from "./api";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

export function LatestAnalysis() {
  const { data: analysis, isLoading } = useLatestAnalysis();
  const { t } = useTranslation();

  if (isLoading || !analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("latestAnalysis.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("latestAnalysis.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">{t("latestAnalysis.regime")}</p>
          <p className="text-lg font-semibold">{analysis.regime}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{t("latestAnalysis.confidence")}</p>
          <Badge variant="default">{analysis.confidence}%</Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{t("latestAnalysis.keyDriver")}</p>
          <p className="text-sm">{analysis.keyDriver}</p>
        </div>
      </CardContent>
    </Card>
  );
}
