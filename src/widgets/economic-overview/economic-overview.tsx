import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { AlertCircle } from "lucide-react";
import { useIndicators } from "@/entities/economic-indicator/api/queries";
import { TrendBadge } from "@/entities/economic-indicator/ui/trend-badge";
import { formatPercent } from "@/shared/lib/utils";
import { useTranslation } from "@/shared/lib/i18n/use-translation";

const OVERVIEW_CODES = ["MA-INFLATION", "MA-GDP-GROWTH", "MA-POLICY-RATE"];

export function EconomicOverview() {
  const { data: indicators, isLoading, isError } = useIndicators();
  const { t } = useTranslation();

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>{t("sourcesPage.errorTitle")}</AlertTitle>
        <AlertDescription>{t("sourcesPage.errorDescription")}</AlertDescription>
      </Alert>
    );
  }

  const overviewIndicators = indicators?.filter((i) => OVERVIEW_CODES.includes(i.code)) ?? [];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-3 w-20" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-4 w-14" />
            </CardContent>
          </Card>
        ))}

      {!isLoading &&
        overviewIndicators.map((indicator) => (
          <Card key={indicator.code}>
            <CardHeader>
              <CardTitle>{indicator.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="tabular-data text-2xl font-semibold">
                {formatPercent(indicator.value)}
              </p>
              <TrendBadge
                trend={indicator.trend}
                change={indicator.change}
                unit="pp"
                className="mt-1"
              />
            </CardContent>
          </Card>
        ))}

      {!isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.liquidity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{t("dashboard.liquidityNormal")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.liquidityDescription")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
